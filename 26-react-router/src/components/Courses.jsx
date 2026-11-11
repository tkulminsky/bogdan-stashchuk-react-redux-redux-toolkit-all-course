import {Link, useLocation, useNavigate} from 'react-router-dom'
import queryString from 'query-string'
import {useEffect, useState} from 'react'
import courses from '../data/courses'

const SORT_KEYS = ['title', 'slug', 'id']

function sortCourses(courses, key) {
  const sortedCourses = [...courses]
  if (!key || !SORT_KEYS.includes(key)) {
    return sortedCourses
  }
  sortedCourses.sort((a, b) => (a[key] > b[key] ? 1 : -1))
  return sortedCourses
}

const Courses = () => {
  const location = useLocation()
  const query = queryString.parse(location.search)
  const currentSortFromUrl = query.sort
  const navigate = useNavigate()
  const [sortKey, setSortKey] = useState(currentSortFromUrl)
  const [sortedCourses, setSortedCourses] = useState(sortCourses(courses, sortKey))
  useEffect(() => {
    if (currentSortFromUrl && !SORT_KEYS.includes(currentSortFromUrl)) {
      navigate('.', {replace: true})
      setSortKey(undefined)
      setSortedCourses([...courses])
    } else {
      setSortKey(currentSortFromUrl)
      setSortedCourses(sortCourses(courses, currentSortFromUrl))
    }
  }, [currentSortFromUrl, navigate])

  const handleSortChange = (e) => {
    const selectedValue = e.target.value
    navigate(`?sort=${selectedValue}`)
    e.target.blur()
  }

  return (
    <>
      <h1>{sortKey ? `Courses sorted by ${sortKey}` : 'Courses'}</h1>

      <div className="dropdown-container">
        <label htmlFor="sortedBy" className="dropdown-label">
          Choose sort by :{' '}
        </label>
        <select
          id="sortedBy"
          className="dropdown-select"
          value={sortKey || ''}
          onChange={handleSortChange}
        >
          <option value="" disabled hidden>
            Choose...
          </option>
          <option value="title">title</option>
          <option value="slug">slug</option>
          <option value="id">id</option>
        </select>
      </div>

      {sortedCourses.map((course) => (
        <div key={course.id}>
          <Link to={course.slug} className="courseLink">
            {course.title}
          </Link>
        </div>
      ))}
    </>
  )
}

export default Courses

// ------- Курс Богданчика без изменений ----- //

// import {Link, useLocation, useNavigate} from 'react-router-dom'
// import queryString from 'query-string'
// import {useEffect, useState} from 'react'
// import courses from '../data/courses'

// const SORT_KEYS = ['title', 'slug', 'id']

// function sortCourses(courses, key) {
//   const sortedCourses = [...courses]
//   if (!key || !SORT_KEYS.includes(key)) {
//     return sortedCourses
//   }
//   sortedCourses.sort((a, b) => (a[key] > b[key] ? 1 : -1))
//   return sortedCourses
// }

// const Courses = () => {
//   const location = useLocation()
//   const query = queryString.parse(location.search)
//   const navigate = useNavigate()
//   const [sortKey, setSortKey] = useState(query.sort)
//   const [sortedCourses, setSortedCourses] = useState(sortCourses(courses, sortKey))
//   useEffect(() => {
//     if (!SORT_KEYS.includes(sortKey)) {
//       navigate('.')
//       setSortKey()
//       setSortedCourses([...courses])
//     }
//   }, [sortKey, navigate])

//   return (
//     <>
//       <h1>{sortKey ? `Courses sorted by ${sortKey}` : 'Courses'}</h1>

//       <div className="dropdown-container">
//         <label htmlFor="sortedBy" className="dropdown-label">
//           Choose sort by :{' '}
//         </label>
//         <select id="sortedBy" className="dropdown-select" defaultValue="">
//           <option value="title">title</option>
//           <option value="slug">slug</option>
//           <option value="id">id</option>
//         </select>
//       </div>

//       {sortedCourses.map((course) => (
//         <div key={course.id}>
//           <Link to={course.slug} className="courseLink">
//             {course.title}
//           </Link>
//         </div>
//       ))}
//     </>
//   )
// }

// export default Courses
