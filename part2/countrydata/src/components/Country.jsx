const Country = ({ name, capital, area, languages, flags }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital {capital}</p>
      <p>Area {area}</p>
      <h2>Languages</h2>
      <ul>
        {languages && Object.values(languages).map((language, i) => <li key={i}>{language}</li>)}
      </ul>
      {flags && <img src={flags.png} alt="flag" />}
    </div>
  );
};

export default Country;
