// Toolbar.jsx
import React from "react";

const Toolbar = ({ onBlock, onUnblock, onDelete }) => {
  return (
    <div>
      <button onClick={onBlock} className="btn btn-danger mr-2">
        Block
      </button>
      <button onClick={onUnblock} className="btn btn-success mr-2">
        Unblock
      </button>
      <button onClick={onDelete} className="btn btn-warning">
        Delete
      </button>
    </div>
  );
};

export default Toolbar;
