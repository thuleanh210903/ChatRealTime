import searchIcon from '../../../public/search.svg';

interface ISearchBar {
  value: string;
  onChange: (value: string) => void;
}
export const SearchBar: React.FC<ISearchBar> = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <img src={searchIcon} className="search-image" />
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
