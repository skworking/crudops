"use client"
import { useState } from "react";
import styles from "../page.module.css";

const AddUser=()=> {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    salary:"",
    hobby: {
      name: '',
      slug: '',
      img: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

  }
  return (
    <main className={styles.main}>
      <h5 className={styles.heading}>User Registration Form</h5>
      <form className={`${styles.formstyle} `} method="post" onSubmit={(e) => { handleSubmit(e) }}>

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
            <input  className={styles.containerdivinput}
              type="text"
              name="img"
              value={formData.hobby.img}
              onChange={handleHobbyChange}
            />
          </label>
        </div>
        <button className={styles.formbtn} type="submit">Submit</button>
      </form>
    </main>
  );
}

export default AddUser;