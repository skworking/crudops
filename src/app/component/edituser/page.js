"use client"
import { useState } from "react";
import styles from '../../page.module.css'
import Image from "next/image";
import {useRouter} from 'next/navigation'
const EditUser=(props)=> {
  const {data,oncancel,onUpdate}=props;

  const router = useRouter()
  const [formData, setFormData] = useState({
 
    name: data?.name ,
    slug:  data?.slug,
    image: {
      thumbnail: data?.image?.thumbnail || '',
      original: data?.image?.original || ''
    },
    description:data?.description,
  
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

//   const handleHobbyChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       image: {
//         ...prevState.hobby,
//         [name]: value
//       }
//     }));
//   };

  const handleHobbyImage=(e)=>{
    const file=e.target.files[0];

    // Create a new FileReader instance
    const reader = new FileReader();
    // const randomid= Math.floor(Math.random() * 1000000000000);
    reader.onload = () => {
    // Set the data URL as the value of formData.hobby.image
    setFormData(prevState => ({
      ...prevState,
      // image: {
      //   ...prevState.image,
      //   image:{
      //     thumbnail: reader.result,
      //     original: reader.result
      //   }
      // }
      image: {
        // ...prevState.image,
        thumbnail: reader.result,
        original: reader.result
      }
      
    }));
    console.log(formData);
   }
    // Read the file as a data URL
   reader.readAsDataURL(file);
  }


// edit section op
  
  const handleUpdate=(e)=>{
    e.preventDefault()
    const _id=data._id;
    onUpdate(formData,_id)
  }

  return (
    <main className={styles.main}>
      {data !== undefined &&
      
      <h5 className={styles.heading}>Update User Details</h5>
      }
      <form className={`${styles.formstyle} `}  /* onSubmit={(e) => { handleSubmit(e) }} */>

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
          {/* <label className={styles.containerdivleft}>
          description:
            <input className={styles.containerdivinput}
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label> */}

          {/* <label className={styles.containerdivright}>
            Hobby Name:
            <input className={styles.containerdivinput}
              type="text"
              name="name"
              value={formData.hobby.name}
              onChange={handleHobbyChange}
            />
          </label> */}
        </div>
        <div className={styles.containerdiv}>
          {/* <label className={styles.containerdivleft}>
            Hobby Slug:
            <input className={styles.containerdivinput}
              type="text"
              name="slug"
              value={formData.hobby.slug}
              onChange={handleHobbyChange}
            />
          </label> */}
          <label className={styles.containerdivright}>
            Hobby Image URL:
                     
            <div>
             <input  className={styles.containerdivinput}
              type="file"
              accept=".png,.jpg"
              name="image"
              onChange={handleHobbyImage}
              />
              {formData?.image &&
              <Image src={formData?.image?.original} width={250} height={100} />
              }
            </div>
            
          </label>
        </div>
       
        <div className="flex gap-4 m-auto">  

        <button className={'bg-red-300 sm:w-[200px] p-2 hover:bg-red-500'} onClick={oncancel}>Cancel</button>
        <button className={'bg-green-300 sm:w-[200px] p-2 hover:bg-green-500'} onClick={handleUpdate}>Update</button>
        </div>
       
      </form>
    </main>
  );
}

export default EditUser;