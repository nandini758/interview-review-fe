import React, { useState, useEffect } from 'react';
import CandidateForm from './CandidateForm';

const Table = () => {
  const [candidates, setCandidates] = useState([]);
  const [updatedCandidates, setUpdatedCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://z2l7gq-8000.csb.app/api/v1/insight/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCandidates(data);
        setUpdatedCandidates(data.map(candidate => ({
          ...candidate,
          rating: candidate.rating || 0
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = (event, id) => {
    const newStatus = event.target.value;
    setUpdatedCandidates(prevCandidates => {
      const updated = prevCandidates.map(candidate =>
        candidate._id === id ? { ...candidate, status: newStatus } : candidate
      );
      return updated;
    });
  };

  const handleFeedbackChange = (event, id) => {
    const newFeedback = event.target.value;
    setUpdatedCandidates(prevCandidates => {
      const updated = prevCandidates.map(candidate =>
        candidate._id === id ? { ...candidate, feedback: newFeedback } : candidate
      );
      return updated;
    });
  };

  const handleRatingChange = (id, rating) => {
    setUpdatedCandidates(prevCandidates => {
      const updated = prevCandidates.map(candidate =>
        candidate._id === id ? { ...candidate, rating: rating } : candidate
      );
      return updated;
    });
  };

  const handleSubmitReview = async () => {
    try {
      updatedCandidates.forEach(async candidate => {
        const response = await fetch('https://z2l7gq-8000.csb.app/api/v1/insight', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(candidate),
        });

        if (!response.ok) {
          throw new Error('Failed to submit review');
        }

        console.log('Review submitted successfully');
    })
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="table-container">
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Interview Status</th>
            <th>Interview Feedback</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>
                <select
                  className="custom-select"
                  value={updatedCandidates.find(c => c._id === candidate._id)?.status || candidate.status}
                  onChange={e => handleStatusChange(e, candidate._id)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>
                <textarea
                  className="editable-textarea"
                  style={{ border: "none" }}
                  value={updatedCandidates.find(c => c._id === candidate._id)?.feedback || candidate.feedback}
                  onChange={e => handleFeedbackChange(e, candidate._id)}
                />
              </td>
              <td>
                <div className="star-rating">
                  {[...Array(5)].map((_, rating) => (
                    <span
                      key={rating}
                      className={rating < (updatedCandidates.find(c => c._id === candidate._id)?.rating || candidate.rating) ? "star filled" : "star"}
                      onClick={() => handleRatingChange(candidate._id, rating + 1)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="review-btn" onClick={handleSubmitReview}>Submit Review</button>
      <CandidateForm />
    </div>
  );
};

export default Table;
