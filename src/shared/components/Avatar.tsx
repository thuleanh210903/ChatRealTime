interface IAvatar {
  className?: string;
}

export const Avatar: React.FC<IAvatar> = ({ className }) => {
  return (
    <div className={`avatar ${className}`}>
      <img
        className="avatar-image"
        alt="avatar"
        src="../../../public/images/avatar.jpg"
      />
    </div>
  );
};
