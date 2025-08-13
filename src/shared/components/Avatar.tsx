interface IAvatar {
  className?: string;
  avatarUrl?: string | '';
  status?: boolean;
}

export const Avatar: React.FC<IAvatar> = ({ className, avatarUrl, status }) => {
  return (
    <div className={`avatar ${className}`}>
      <img className="avatar-image" alt="avatar" src={avatarUrl} />
      {status && <div className="avatar-status"></div>}
    </div>
  );
};
