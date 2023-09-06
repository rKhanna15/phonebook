const Filter = ({search, searchNames}) =>(
    <div>
      filter shown with: 
      <input value={search} onChange={searchNames}/>
    </div>
  )
export default Filter