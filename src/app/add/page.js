"use client"
import { useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";

const AddUser=(props)=> {
  const {data,oncancel,onUpdate}=props;

  console.log(data );
  const [formData, setFormData] = useState({
    name: data?.name ,
    age:  data?.age,
    salary: data?.salary,
    hobby: {
      name:  data?.hobby?.name,
      slug:  data?.hobby?.slug,
      image: data?.hobby?.image
    }
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleHobbyChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      hobby: {
        ...prevState.hobby,
        [name]: value
      }
    }));
  };

  const handleHobbyImage=(e)=>{
    const file=e.target.files[0];

    // Create a new FileReader instance
    const reader = new FileReader();

    reader.onload = () => {
    // Set the data URL as the value of formData.hobby.image
    setFormData(prevState => ({
      ...prevState,
      hobby: {
        ...prevState.hobby,
        // image:file
        image: reader.result
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
   
    }
  }

// edit section op
  
  const handleUpdate=(e)=>{
    e.preventDefault()
    const _id=data._id;
    onUpdate(formData,_id)
  }

  return (
    <main className={styles.main}>
      {data === undefined ?
      <h5 className={styles.heading}>User Registration Form</h5>
      :
      <h5 className={styles.heading}>Update User Details</h5>
      }
      <form className={`${styles.formstyle} `} method="post"  /* onSubmit={(e) => { handleSubmit(e) }} */>

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
            Age:
            <input className={styles.containerdivinput}
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.containerdiv}>
          <label className={styles.containerdivleft}>
            Salary:
            <input className={styles.containerdivinput}
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </label>

          <label className={styles.containerdivright}>
            Hobby Name:
            <input className={styles.containerdivinput}
              type="text"
              name="name"
              value={formData.hobby.name}
              onChange={handleHobbyChange}
            />
          </label>
        </div>
        <div className={styles.containerdiv}>
          <label className={styles.containerdivleft}>
            Hobby Slug:
            <input className={styles.containerdivinput}
              type="text"
              name="slug"
              value={formData.hobby.slug}
              onChange={handleHobbyChange}
            />
          </label>

          <label className={styles.containerdivright}>
            Hobby Image URL:
                     
            <div>
             <input  className={styles.containerdivinput}
              type="file"
              accept=".png,.jpg"
              name="img"
              onChange={handleHobbyImage}
              />
              {formData.hobby.image &&
              <Image src={formData?.hobby?.image} width={250} height={100} />
              }
            </div>
            
          </label>
        </div>
        { data === undefined ?
        <button className={styles.formbtn} type="submit" onClick={handleSubmit}>Submit</button>
        :
        <div className="flex gap-4 m-auto">  

        <button className={'bg-red-300 sm:w-[200px] p-2 hover:bg-red-500'} onClick={oncancel}>Cancel</button>
        <button className={'bg-green-300 sm:w-[200px] p-2 hover:bg-green-500'} onClick={handleUpdate}>Update</button>
        </div>
        }
      </form>
    </main>
  );
}

export default AddUser;