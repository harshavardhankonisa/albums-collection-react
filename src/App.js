import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [warning,setWarning] = useState();
  const [addAlbum,setAddAlbum] = useState(false);
  const [updateAlbum,setUpdateAlbum] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [updateId, setUpdateId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.log('Failed to retrieve data:', error);
      }
    };

    fetchData();
  },([]));

  function displayWarning(warning){
    return(
      <div className='warning'>
        <p>{warning}</p>
      </div>
    );
  }

  function addAlbumData() {
    const userId = document.getElementById('addUserId').value;
    const title = document.getElementById('addTitle').value;
    if(parseInt(userId) && title){
      const uniqueId = albums.length > 0 ? Math.max(...albums.map(album => album.id)) + 1 : 1;
      const newAlbum = {
        userId: parseInt(userId),
        id: uniqueId,
        title: title
      };
      fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        body: JSON.stringify({
          title: newAlbum.title,
          id: 1,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => setAlbums(prevAlbums => [...prevAlbums, json]))
      setAddAlbum(false);
      setWarning("Added album data successfully");
      setTimeout(function() {
        setWarning();
      }, 3000);
    }else{
      setAddAlbum(false);
      setWarning("Please check input correctly for adding album");
      setTimeout(function() {
        setWarning();
      }, 3000);
    }    
  }


  function displayAddAlbum(){
    return (
      <div className='addAlbumPop'>
        <div className='container'>
          <label htmlFor="addUserId"> User ID: </label>
          <input type="text" name="userId" id="addUserId" placeholder='Numbers only allowed'/>
          <br />
          <label htmlFor="addTitle"> Article Title: </label>
          <input type="text" name="title" id="addTitle" placeholder='Text only allowed'/>
          <div className='addAlbumController'>
            <button className='btn' onClick={()=>setAddAlbum(false)}>Close</button>
            <button className='btn' onClick={()=> addAlbumData()}>Add Album</button>
          </div>
        </div>
      </div>
    );
  }

  function updateAlbumData(id){
    const albumIndex = albums.findIndex(album => album.id === id);
    const userId = document.getElementById('updateUserId').value;
    const title = document.getElementById('updateTitle').value;
    if(parseInt(userId) && title){
      const updatedAlbums = albums;
      updatedAlbums[albumIndex] = {
        id: albumIndex,
        userId: parseInt(userId),
        title: title
      }
      fetch('https://jsonplaceholder.typicode.com/albums/1', {
        method: 'PUT',
        body: JSON.stringify(updatedAlbums[albumIndex]),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => setAlbums([...updatedAlbums]));
      setUpdateAlbum(false);
      setWarning("Updated album data successfully");
      setTimeout(function() {
        setWarning();
      }, 3000);
    }else{
      setUpdateAlbum(false);
      setWarning("Please check input correctly for updating album");
      setTimeout(function() {
        setWarning();
      }, 3000);
    }    
  }

  function displayUpdateAlbum(updateId){
    const albumToUpdate = albums.find(album => album.id === updateId);
    return(
      <div className='addAlbumPop'>
        <div className='container'>
          <label htmlFor="updateUserId"> User ID: <span>{albumToUpdate.userId}</span> </label>
          <input type="text" name="userId" id="updateUserId" placeholder='Numbers only allowed'/>
          <br />
          <label htmlFor="updateTitle"> Article Title: <br /> <span>{albumToUpdate.title}</span></label>
          <input type="text" name="title" id="updateTitle" placeholder='Text only allowed'/>
          <div className='addAlbumController'>
            <button className='btn' onClick={()=>setUpdateAlbum(false)}>Close</button>
            <button className='btn' onClick={()=> updateAlbumData(updateId)}>Update Album</button>
          </div>
        </div>
      </div>
    )
  }

  function deleteAlbum(albumId){
    const updatedAlbums = albums.filter(album => album.id !== albumId);
    fetch('https://jsonplaceholder.typicode.com/albums/1', {
      method: 'DELETE',
    });
    setAlbums(updatedAlbums);
  }
  
  return (
    <div className="App">
      <header>
        <a className='albumCollectionLogo btn' href="/">Albums Home</a>
        <button className='addAlbum btn' onClick={()=>{setAddAlbum(true)}} >Add Album</button>
      </header>
      {warning && displayWarning(warning)}
      {addAlbum && displayAddAlbum()}
      {updateAlbum && displayUpdateAlbum(updateId)}
      <main>
        <div className='albumResults'>
          {albums.map(album => (
            <div className='albumCard' key={album.id}>
              <p className='albumTitle'>{album.title}</p>
              <p className='albumUserId'>User ID: <span>{album.userId}</span></p>
              <div className='albumCardController'>
                <button className='updateAlbum btn' onClick={()=>{setUpdateAlbum(true); setUpdateId(album.id)}} >Update Album</button>
                <button className='deleteAlbum btn' onClick={()=>{deleteAlbum(album.id)}}>Delete Album</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
