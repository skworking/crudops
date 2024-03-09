"use client"
import { useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { IoIosArrowDown } from "react-icons/io";
import Select from 'react-select'
const AddUser = () => {

  const [view, setView] = useState(false)
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsAttribute, setSelectedOptionsAttribute] = useState([]);
  const [selectedOptionsOption, setSelectedOptionsOption] = useState([]);
  const [attribute, setAttribute] = useState(false);
  const initialVariationOption = {
    title: '',
    price: '',
    sale_price: '',
    quantity: '',
    is_disable: 0,
    sku: '',
    options: []
  };
  const initialVriation = {
    attribute_id: null,
    value: '',
    attribute: {
      slug: '',
      name: '',
      values: []
    }
  }
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: {
      // thumbnail: '',
      // original: ''
    },
    gallery: [],
    tag: [],
    quantity: 0,
    price: '',
    sale_price: '',
    brand: '',
    weight: '',
    min_price: '',
    max_price: '',
    variations: [initialVriation],
    variation_options: [initialVariationOption]

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

  const tags = [
    { value: 'Phone', label: 'phone' },
    { value: 'Apple', label: 'apple' },
    { value: 'Cilantro', label: 'cilantro' },
    { value: 'Smart TV', label: 'smart-tv' }
  ];
  const attributetab = [
    { value: '12oz', label: '12oz', id: "3" },
    { value: '24oz', label: '24oz', id: "3" },
    { value: '36oz', label: '36oz', id: "3" },

  ]
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
  const [model, setModel] = useState(false)

  const handleSelect = (selectedOption) => {

    setSelectedOptions(selectedOption)
    setFormData(prevFormData => ({
      ...prevFormData,
      // tag: selectedOption
      tag: [
        ...selectedOption.map(option => ({
          name: option.value,
          slug: option.label
        }))
      ]
    }));
  }

  const handleSelectoption = (selectedOption, index) => {

    const updatedOptions = selectedOption.map(option => ({
      name: option.label, // Assuming label corresponds to the name property in options
      value: option.value
    }));
    // setSelectedOptionsOption(selectedOption)
    // setFormData(prevFormData => ({

    //   ...prevFormData,
    //   variation_options: [
    //     {
    //       ...prevFormData.variation_options[0],
    //       options: updatedOptions

    //     }
    //   ]
    // }));

    setFormData(prevState => {
      const updatedVariationOptions = [...prevState.variation_options];
      console.log("updated", updatedOptions);
      updatedVariationOptions[index] = {
        ...updatedVariationOptions[index],
        options: updatedOptions
      };

      return {
        ...prevState,
        variation_options: updatedVariationOptions
      };
    });

  }

  const handleSelectAttribute = (selectedOption, index) => {
    console.log(selectedOption);
    const attributeOptions = selectedOption.map(option => ({
      attribute_id: option?.id, // Assuming label corresponds to the name property in options
      value: option?.value
    }));
    // setSelectedOptionsAttribute(selectedOption)
    setFormData(prevFormData => {
      const updatedVariationOptions = [...prevFormData.variations]
      updatedVariationOptions[index].attribute.values = attributeOptions;
      return {
        ...prevFormData,
        variations: updatedVariationOptions
      };
    })

  }

  const handleVariationChange = (e, index) => {

    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      variations: prevState.variations.map((option, i) => {
        if (i === index) {
          return {
            ...option,
            [name]: value
          };
        }
        return option;
      }),

    }));

  }



  const handleVariationOptionChange = (index, e) => {
    e.preventDefault();

    const { name, value } = e.target;
    console.log(name, value, index);

    setFormData(prevState => ({
      ...prevState,
      variation_options: prevState.variation_options.map((option, i) => {
        if (i === index) {

          return {
            ...option,
            [name]: value
          };
        }
        return option;
      })
    }));
  };

  const handleVariationAttributeChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      variations: prevState.variations.map((item, i) => {
        if (i === index) {

          return {
            ...item,
            attribute: {
              ...item.attribute,
              [name]: value
            }
          };
        }
      })
    }))
  }

  const handlemodel = (e) => {
    e.preventDefault();
    setModel(!model)
  }
  const handleShow = (e) => {
    e.preventDefault();
    setView(!view)
  }

  const handleAddVariation=(e)=>{
    e.preventDefault()
    setFormData({
      ...formData,
      variations:[
        ...formData.variations,
        {
          attribute_id:'',
          value: '',
          attribute: {
            slug: '',
            name: '',
            values: []
          }
        }
      ]
    })
  }

  const handleAddVariationOption = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
      variation_options: [
        ...formData.variation_options,
        {
          title: '',
          price: '',
          sale_price: '',
          quantity: '',
          is_disable: '',
          sku: '',
        },
      ],
    });
  };

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
              value={formData?.name}
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
            <input className={styles.containerdivinput}
              type="file"
              accept=".png,.jpg"
              name="image"
              onChange={handleHobbyImage}
            />

            <div className="flex p-2 gap-2 ">
              {formData.image && formData.image !== '' &&

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

            <Select
              isMulti={true}
              value={selectedOptions}
              onChange={handleSelect}
              placeholder="Selected Tags"
              options={options}

            />
          </section>
        </div>
        <div className={styles.containerdiv}>

          <label className={styles.containerdivright}>
            max_price:
            <input className={styles.containerdivinput}
              type="number"
              name="max_price"
              value={formData.max_price}
              onChange={handleNumberChange}
            />
          </label>
          <label className={styles.containerdivright} onClick={handleShow}>
            <button className={styles.containerdivinput}>
              Add Variation
            </button>


          </label>
          <label className={styles.containerdivright} onClick={handlemodel}>
            <button className={styles.containerdivinput}>

              Add Variation_option
            </button>


          </label>
        </div>


        <button className={styles.formbtn} type="submit" onClick={handleSubmit}>Submit</button>

      </form>
      {
        view && <>
          <div className="bg-red-400 absolute h-screen w-full top-12 ">
            <button onClick={handleShow} className="absolute top-10 right-5 bg-gray-400 p-2 rounded-full w-10 h-10">
              X
            </button>
            {formData.variations.map((option, index) => (
              <form className="mt-10">
                <h1 className="text-lg text-center text-white ">Variations Form </h1>
                <div className={styles.containerdiv}>
                  <label className={styles.containerdivright}>
                    attribute_id:
                    <input className={styles.containerdivinput}
                      type="text"
                      name="attribute_id"
                      value={option?.attribute_id}
                      onChange={(e) => { handleVariationChange(e, index) }}
                    />
                  </label>
                  <label className={styles.containerdivright}>
                    value:
                    <input className={styles.containerdivinput}
                      type="text"
                      name="value"
                      value={option?.value}
                      onChange={(e) => { handleVariationChange(e, index) }}
                    />
                  </label>
                  <label className={styles.containerdivright}>
                    slug:
                    <input className={styles.containerdivinput}
                      type="text"
                      name="slug"
                      value={option?.attribute?.slug}
                      onChange={(e) => { handleVariationAttributeChange(e, index) }}
                    />
                  </label>
                </div>
                <div className={styles.containerdiv}>
                  <label className={styles.containerdivright}>
                    name:
                    <input className={styles.containerdivinput}
                      type="text"
                      name="name"
                      value={option?.attribute?.name}
                      onChange={(e) => { handleVariationAttributeChange(e, index) }}
                    />
                  </label>
                  <label className={styles.containerdivright}>
                    <Select
                      isMulti={true}
                      value={option?.attribute?.values?.name}
                      onChange={(selectedOptions) => handleSelectAttribute(selectedOptions, index)}
                      placeholder="Selected Attribute"
                      options={attributetab}
                    />
                  </label>
                </div>
                <div className={styles.containerdiv}>
                  <button onClick={handleAddVariation} className="w-1/6 ml-10 bg-gray-300 ">Add More</button>
                </div>

              </form>
            ))}
          </div>
        </>
      }

      {model && <div className="bg-red-400 absolute h-screen w-full top-12 ">
        <button onClick={handlemodel} className="absolute top-10 right-5 bg-gray-400 p-2 rounded-full w-10 h-10">
          X
        </button>
        <h1 className="text-lg text-center  ">Variation_Options Form </h1>
       
        {formData.variation_options.map((option, index) => (

          <div key={index}>
            <div className={styles.containerdiv}>

              <label className={styles.containerdivright}>
                title:
                <input className={styles.containerdivinput}
                  type="text"
                  name="title"
                  value={option.title}
                  onChange={(e) => { handleVariationOptionChange(index, e) }}
                />
              </label>
              <label className={styles.containerdivright}>
                price:
                <input className={styles.containerdivinput}
                  type="number"
                  name="price"
                  value={option.price}
                  onChange={(e) => { handleVariationOptionChange(index, e) }}
                />
              </label>
              <label className={styles.containerdivright}>
                sale_price:
                <input className={styles.containerdivinput}
                  type="text"
                  name="sale_price"
                  value={option.sale_price}
                  onChange={(e) => { handleVariationOptionChange(index, e) }}
                />
              </label>
            </div>
            <div className={styles.containerdiv}>

              <label className={styles.containerdivright}>
                quantity:
                <input className={styles.containerdivinput}
                  type="text"
                  name="quantity"
                  value={option.quantity}
                  onChange={(e) => { handleVariationOptionChange(index, e) }}
                />
              </label>

              <label className={styles.containerdivright}>
                is_disable:
                <input className={styles.containerdivinput}
                  type="number"
                  name="is_disable"
                  value={option.is_disable}
                  onChange={(e) => { handleVariationOptionChange(index, e) }}
                />
              </label>
              <label className={styles.containerdivright}>
                sku:
                <input className={styles.containerdivinput}
                  type="number"
                  name="sku"
                  value={option.sku}
                  onChange={(e) => { handleVariationOptionChange(index, e) }}
                />
              </label>
              <label className={styles.containerdivright}>
                <Select
                  isMulti={true}
                  value={option.name}
                  // onChange={handleSelectoption}
                  onChange={(selectedOption) => handleSelectoption(selectedOption, index)}
                  placeholder=" Select Options"
                  options={tags}

                />
              </label>
            </div>

            <div className={styles.containerdiv}>
              <button onClick={handleAddVariationOption} className="w-1/6 ml-10 bg-gray-300 ">Add More</button>
            </div>
          </div>
        ))}
      </div>
      }



    </main>
  );
}

export default AddUser;


