export const UserCard = () => {
  return (
    <div className="card">
      <div className="card-image avatar">
        <img
          className="avatar-image"
          alt="avatar"
          src="../../../public/images/avatar.jpg"
        />
      </div>
      <div className="card-content">
        <h2 className="card-title">John Doe</h2>
        <p className="card-desc">How are you doing ?</p>
      </div>
      <div className="card-subcontent">
        <p className="card-subtitle">16:45</p>
        <img className="card-icon" />
      </div>
    </div>
  );
};
