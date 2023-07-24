import { useState, useEffect } from "react"

const useFetch = (url) => {
    const [data, setData] = useState([])


    //Fetch Data From API
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if(!res.ok) {
                throw Error('could not fetch the data for that resource')
            }
            return res.json()
        })
        .then(data => {
            setData(data)
        })
        .catch(err => {
            console.log(err.message)
        })
    }, [url])

  return  [data]
}

export default useFetch