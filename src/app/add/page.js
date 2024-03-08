"use client"
import { useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io";
import Select from 'react-select'
const AddUser = () => {

  const [view,setView]=useState(false)
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: {
      thumbnail: '',
      original: ''
    },
    gallery: [],
    tag:[],
    quantity:0,
    price:'',
    sale_price:'',
    brand:'',
    weight:'',
    min_price:'',
    max_price:'',
 

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value); // Parse value to number
    setFormData(prevState => ({
        ...prevState,
        [name]: parsedValue // Store parsed value
    }));
};
  console.log(formData);

  const handleHobbyImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log("file", file);
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

  const handleGalleryImage = (e) => {

    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        // Update formData with the new image
        setFormData(prevState => ({
          ...prevState,
          gallery: [
            ...prevState.gallery,
            {
              thumbnail: reader.result,
              original: reader.result
            }
          ]
        }));
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", formData);
    let result = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify(formData)
    });
    result = await result.json();
    if (result.success) {
      alert("data inserted successfully");
      router.push('/user-list');

    }
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  // const tags = [
  //   {  name: 'Phone', slug: 'phone' },
  //   {  name: 'Apple', slug: 'apple' },
  //   {  name: 'Cilantro', slug: 'cilantro' },
  //   {  name: 'Smart TV', slug: 'smart-tv' }
  // ];
  // let selectedTags = [];
//   const handleTagSelection = (event) => {
//     const options = event.target.options;
    
//     for (let i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//             selectedTags.push(tags.find(tag => tag.name === options[i].value));
//         }
//     }


//     setFormData(prevFormData => ({
//       ...prevFormData,
//       tag: selectedTags
//     }));
// };

const handleSelect=(selectedOption)=>{
  
  setSelectedOptions(selectedOption)
  setFormData(prevFormData => ({
    ...prevFormData,
    // tag: selectedOption
    tag:[
      ...selectedOption.map(option => ({
        name: option.value,
        slug: option.label
      }))
    ]
  }));
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
          <label className={styles.containerdivright}>
            Quantity:
            <input className={styles.containerdivinput}
              type="tel"
              name="quantity"
              value={formData.quantity}
              onChange={handleNumberChange}
            />
          </label>
          <label className={styles.containerdivright}>
            price:
            <input className={styles.containerdivinput}
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <label className={styles.containerdivright}>
            sale_price:
            <input className={styles.containerdivinput}
              type="text"
              name="sale_price"
              value={formData.sale_price}
              onChange={handleChange}
            />
          </label>
          <label className={styles.containerdivright}>
            brand:
            <input className={styles.containerdivinput}
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </label>
          <label className={styles.containerdivright}>
            weight:
            <input className={styles.containerdivinput}
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </label>
          <label className={styles.containerdivright}>
            min_price:
            <input className={styles.containerdivinput}
              type="text"
              name="min_price"
              value={formData.min_price}
              onChange={handleNumberChange}
            />
          </label>
        </div>

        <div className={styles.containerdiv}>

          <label className={styles.containerdivright}>
            Image URL:

            <div>
              <input className={styles.containerdivinput}
                type="file"
                accept=".png,.jpg"
                name="image"
                onChange={handleHobbyImage}
              />

              {formData.image &&
                <Image src={formData?.image?.original} width={100} height={100} />
              }
              </div>
          </label>

          <label className={styles.containerdivright}>
            Select Multiple Image Gallery:
              <input className={styles.containerdivinput}
                // id="fileInput"
                type="file"
                accept=".png,.jpg"
                name="gallery"
                onChange={handleGalleryImage}
                multiple
              />
            <div className="flex p-2 gap-2  ">
              {/* <button onClick={handleAddAnotherImage}>Add Another Image</button> */}
              {formData.gallery.length > 0 &&
                formData.gallery.map((item) => {
                  console.log(item);
                  return (
                    <div key={item._id} className="w-[100px] border-2 flex text-center flex-wrap">

                      <Image src={item?.original} className="  object-contain" width={200} height={100} />
                    </div>
                  )
                })
                
              }
            </div>

          </label>
          <section className={styles.containerdivright}>

          {/* <div className="flex flex-col">      
             <label className="border-2 flex items-center px-2 justify-between" 
              onClick={() =>{setView(!view)}}
             >
              Select tags
             <IoIosArrowDown />
             </label>
             {formData?.tag.map((item)=>{return(
              <>
               {item.name}
              </>
             )})}
             {view &&
                <select id="tags" multiple onChange={handleTagSelection}>
                    {tags.map((tag) =>{
                      return(
                        
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                        
                        )})}
                </select>
              }
          </div> */}
           <Select
            isMulti={true}
            value={selectedOptions}
            onChange={handleSelect}
            placeholder="Selected Tags"
            options={options}
          
          />
         </section>
        </div>
        <div>
        
          <label className={styles.containerdivright}>
            max_price:
            <input className={styles.containerdivinput}
              type="number"
              name="max_price"
              value={formData.max_price}
              onChange={handleNumberChange}
            />
          </label>
        </div>
        <button className={styles.formbtn} type="submit" onClick={handleSubmit}>Submit</button>

      </form>
    </main>
  );
}

export default AddUser;


