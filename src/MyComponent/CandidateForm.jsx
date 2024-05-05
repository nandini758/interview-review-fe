import React, { useState } from 'react';
import './CandidateForm.css';

const CandidateForm = () => {
  const [name, setName] = useState('');
  const [interviewStatus, setInterviewStatus] = useState('Pending');
  const [interviewFeedback, setInterviewFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddUser = async () => {
    try {
      const response = await fetch('https://z2l7gq-8000.csb.app/api/v1/insight/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          status: interviewStatus,
          feedback: interviewFeedback,
          rating,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log('Failed to add candidate:', data);
        return;
      }

      // Reset form fields and hide the form
      setName('');
      setInterviewStatus('Pending');
      setInterviewFeedback('');
      setRating('');
      setShowForm(false);

      window.location.reload();

      console.log('Candidate added successfully');
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const handleAddClick = () => {
    setShowForm(!showForm); // Toggle the visibility of the form
  };

  return (
    <div>
      <button onClick={handleAddClick} className="add-button">
        Add Candidate
      </button>
      {showForm && (
        <div className="form-container">
          <form className="form">
            <div className="form-group">
              <label className="form-label">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Interview Status:</label>
              <select
                value={interviewStatus}
                onChange={(e) => setInterviewStatus(e.target.value)}
                className="form-select"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Interview Feedback:</label>
              <textarea
                value={interviewFeedback}
                onChange={(e) => setInterviewFeedback(e.target.value)}
                className="form-textarea"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Rating:</label>
              <input
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-input"
              />
            </div>
            <button type="button" className="submit-button" onClick={handleAddUser}>
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CandidateForm;
