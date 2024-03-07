"use client"
import { useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import {useRouter} from 'next/navigation'
const AddUser=()=> {


  const router = useRouter()
  const [formData, setFormData] = useState({
    name:'',
    slug:'',
    description:'',
    image: {
      thumbnail:'',
      original:''
    },
    gallery: [
      {
      thumbnail : '',
      original:'',
      }
    ]

    
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleHobbyImage=(e)=>{
    const file=e.target.files[0];

    // Create a new FileReader instance
    const reader = new FileReader();
    // const randomid= Math.floor(Math.random() * 1000000000000);
    reader.onload = () => {
    // Set the data URL as the value of formData.hobby.image
    setFormData(prevState => ({
      ...prevState,
   
      image: {
        ...prevState.image,
        // id:randomid,
        thumbnail: reader.result,
        original: reader.result
      }
      
    }));
  
   }
    // Read the file as a data URL
   reader.readAsDataURL(file);
  }

  const handleGalleryImage=(e)=>{
    const file=e.target.files[0];

    // Create a new FileReader instance
    const reader = new FileReader();
    // const randomid= Math.floor(Math.random() * 1000000000000);
    reader.onload = () => {
    // Set the data URL as the value of formData.hobby.image
    setFormData(prevState => ({
      ...prevState,
   
      gallery: {
        ...prevState.gallery,
        // id:randomid,
        thumbnail: reader.result,
        original: reader.result
      }
      
    }));
  
   }
    // Read the file as a data URL
   reader.readAsDataURL(file);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("data",formData);
    let result=await fetch("http://localhost:3000/api/users",{
      method:"POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body:JSON.stringify(formData)
    });
    result=await result.json();
    if(result.success){
      alert("data inserted successfully");
      router.push('/user-list');
   
    }
  }


  return (
    <main className={styles.main}>
    
      <h5 className={styles.heading}>User Registration Form</h5>
     
      <form className={`${styles.formstyle} `} method="post" >

        <div className={styles.containerdiv}>
        
          <label className={styles.containerdivleft}>
            Name:
          <input className={styles.containerdivinput}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange} 
          />
          </label>
        
          <label className={styles.containerdivright}>
          slug:
            <input className={styles.containerdivinput}
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
            />
          </label>
          <label className={styles.containerdivleft}>
          description:
            <input className={styles.containerdivinput}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
        </div>
       
        <div className={styles.containerdiv}>
       
          <label className={styles.containerdivright}>
           Image URL:
                     
            <div>
             <input  className={styles.containerdivinput}
              type="file"
              accept=".png,.jpg"
              name="image"
              onChange={handleHobbyImage}
              />
              {formData.image &&
              <Image src={formData?.image?.original } width={250} height={100} />
              }
            </div>
            
          </label>

          <label className={styles.containerdivright}>
           Image Gallery:
                     
            <div>
             <input  className={styles.containerdivinput}
              type="file"
              accept=".png,.jpg"
              name="image"
              onChange={handleGalleryImage}
              multiple
             />

              {formData.gallery.length >0 &&
                formData.gallery.map((item)=>{
                  <Image src={formData?.gallery?.original } width={250} height={100} />
                })
              // <Image src={formData?.gallery?.original } width={250} height={100} />
              }
            </div>
            
          </label>
        </div>
      
        <button className={styles.formbtn} type="submit" onClick={handleSubmit}>Submit</button>
       
      </form>
    </main>
  );
}

export default AddUser;