import React, { Fragment,setState,useState,Component, useEffect } from 'react';
import { Map, GoogleApiWrapper ,Marker} from 'google-maps-react';



const API_KEY=process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const GMap=()=>{
      
      const [userLoc,setLoc]=useState({
          lat:0,
          lng:0,
          posts:[]
      });
      useEffect(()=>{
        
          geocode();
          //listJobPosts();
      },[])
    //   async function listJobPosts(){
    //     try {
    //       const response=await fetch("http://localhost:5000/dashboard/getjobposts",{
    //         method:"GET",
    //         headers:{token:localStorage.token}
    //       })
    //       const parseRes=await response.json()
    //       const state=userLoc
    //       console.log(userLoc)
    //       for( let i=0;i<parseRes.length;i++){
    //         userLoc.posts.push(parseRes[i])
    //       }
          
    //     } catch (error) {
    //       console.error(error.message)
    //     }
    // }
    const listjobposts=()=>{
        if(userLoc.posts===null){
          return
        }
        return userLoc.posts.map((post,index)=>{
          return <div style={{background:"white"}}><h1 style={{fontSize:"15px"}}>Position: {post.job_title}</h1>
          <h1 style={{fontSize:"15px"}}>Location: {post.job_location}</h1>
          <h1 style={{fontSize:"15px"}}>Description: {post.job_desc}</h1>
          </div>
        })
     }
     async function geocode(){
        try {
            const response = await fetch("http://localhost:5000/dashboard",{
            method:"GET",
            headers:{token:localStorage.token}
        });
        
        const parseRes=await response.json()
        
        setLoc({...userLoc,lat:parseRes.address_lat,lng:parseRes.address_long,posts:parseRes.job_post})
        
        
        } catch (error) {
            console.error(error.message)
        }
      }
      async function postJob(e){
       
        try {
            const post={
              job_title: document.getElementById("jobTitle").value,
              job_location: document.getElementById("jobLoc").value,
              job_desc: document.getElementById("jobDesc").value
            }
            console.log(post)
            const response = await fetch("http://localhost:5000/dashboard/postjob",{
                method:"POST",
                headers:{"Content-Type":"application/json",token:localStorage.token},
                body:JSON.stringify(post)
            });
            const parseRes=await response.json()
            console.log(parseRes)
        } catch (error) {
            
        }
    }

    console.log(userLoc)
    return (
     <Fragment>
     <h1 style={{textAlign:"center",color:"white"}}>{userLoc.lat}</h1>
     <h1 style={{ textAlign:"center",color:"white"}}>{userLoc.lng}</h1>
     <div id="postwindow" style={{maxHeight:"300px",maxWidth:"400px" }}>
        {listjobposts()}
     </div>
     <form onSubmit={(e)=>postJob(e)}>
            <input type="text" id="jobTitle" name="jobTitle" placeholder="Job Title"></input>
            <input type="text" id="jobLoc" name="jobLoc"placeholder="Location"></input>
            <input type="text" id="jobDesc" name="jobDesc"placeholder="Description/Qualifications"></input>
            <button>Submit</button>
        </form>
     <div style={{
        
    alignItems: 'center',
    justifyContent: 'center',
    }}>
      <Map
        id="test"
        google={window.google}
        style={{width: '500px',
        height: '500px'}}
        zoom={15}
        center={
          {
            lat: userLoc.lat,
            lng: userLoc.lng
          }
        }
      >
        <Marker position={{ lat:userLoc.lat, lng:userLoc.lng}} />  
        
      </Map>
      </div>
      </Fragment>
    );
}
// export class MapContainer extends Component {
    
//   render() {
//     const mapStyles = {
//         width: '100%',
//         height: '100%'
//       };
//       const state={
//           lat:0,
//           long:0,
//       }
//      async function geocode(){
          
//           try{
//               const location=await axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
//                   params:{
//                       address:'2761 Bath Ave',
//                       key:API_KEY
//                   }
//               }).then(async result=>{
                  
//                 // const parseRes=result
//                 // console.log( parseRes.data.results[0].geometry.location)
               
//                 var loc=await result.data.results[0].geometry.location.lat
//                 state.lat=loc
//                 console.log(state.lat)
//               })
             
//           }
//           catch(error){
//               console.log(error);
//           }
//       }
    

    
    
//     geocode()
//     console.log(state.lat)
//     return (
   
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={
//           {
//             lat: state.lat,
//             lng: state.long
//           }
//         }
//       />
//     );
//   }
// }

export default GoogleApiWrapper({
  apiKey: API_KEY
})(GMap);
