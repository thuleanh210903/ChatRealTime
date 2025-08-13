import searchIcon from '../../../public/search.svg';
export const SearchBar = () => {
  return (
    <div className="search-bar">
      <img src={searchIcon} className="search-image" />
      <input type="text" placeholder="Search" className="search-input" />
    </div>
  );
};
