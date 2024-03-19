"use client"
import { useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { IoIosArrowDown, IoIosCloseCircle } from "react-icons/io";
import Select from 'react-select'
import { options, tags, attributetab } from "../component/common/comman";
import Input from "../component/Reuseable/input";
import File from "../component/Reuseable/file";
import Button from "../component/Reuseable/button";
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
    quantity: 0,
    is_disable: 0,
    sku: '',
    options: []
  };
  const initialVriation = {
    attribute_id: 0,
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
    },
    gallery: [],
    tag: [],
    product_type: '',
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
    const newValue = !isNaN(value) && value !== '' ? parseFloat(value) : 0;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue // Store parsed value
    }));
  };


  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    try {
      const data = new FormData()
      data.append("file", file)
      const res = await fetch('/api/upload', { method: 'POST', body: data })
      if (res.ok) {
        console.log(res);
        setFormData(prevState => ({
          ...prevState,
          image: {
            ...prevState.image,
            thumbnail: file.name,
            original: file.name
          }

        }));
      } else {
        console.error("Failed to upload image. Status:", res);
      }
    } catch (err) {
      console.log(err);
    }


    // const reader = new FileReader();
    // reader.onload = () => {
    //   // Set the data URL as the value of formData.hobby.image
    //   setFormData(prevState => ({
    //     ...prevState,

    //     image: {
    //       ...prevState.image,
    //       // id:randomid,
    //       thumbnail: reader.result,
    //       original: reader.result
    //     }

    //   }));

    // }
    // Read the file as a data URL
    // reader.readAsDataURL(file);
  }



  const handleGalleryImage = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    const newGalleryImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append("file", file);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: data });
        if (res.ok) {
          newGalleryImages.push({
            thumbnail: file.name,
            original: file.name
          });
        } else {
          console.error("Failed to upload image:", file.name);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // After all uploads are complete, update the state with new gallery images
    setFormData(prevState => ({
      ...prevState,
      gallery: [
        ...prevState.gallery,
        ...newGalleryImages
      ]
    }));
  };

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

  const handleVariationNumberChange = (e, index) => {

    const { name, value } = e.target;
    // const parsedValue = parseFloat(value);
    const newValue = !isNaN(value) && value !== '' ? parseFloat(value) : 0;
    setFormData(prevState => ({
      ...prevState,
      variations: prevState.variations.map((option, i) => {
        if (i === index) {
          return {
            ...option,
            [name]: newValue
          };
        }
        return option;
      }),

    }));

  }


  const handleVariationOptionBoolean = (e, index) => {
    e.preventDefault();
    const { name } = e.target;

    setFormData(prevState => ({
      ...prevState,
      variation_options: prevState.variation_options.map((option, i) => {
        if (i === index) {

          return {
            ...option,
            [name]: !option.is_disable
          };
        }
        return option;
      })
    }));
  }

  const handleVariationOptionChange = (e, index) => {
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

  const handleVariationOptionNumberChange = (e, index) => {

    e.preventDefault()
    const { name, value } = e.target;
    console.log(value);

    // const parsedValue = parseFloat(value);
    const newValue = !isNaN(value) && value !== '' ? parseFloat(value) : 0;
    setFormData(prevState => ({
      ...prevState,
      variation_options: prevState.variation_options.map((option, i) => {
        if (i === index) {

          return {
            ...option,
            [name]: newValue
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
        return item;
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

  const handleAddVariation = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
      variations: [
        ...formData.variations,
        {
          attribute_id: '',
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
          quantity: 0,
          is_disable: '',
          sku: '',
          options: []
        },
      ],
    });
  };

  const removeFormFields = (e, index) => {
    e.preventDefault();
    let newvariations;
    if (formData.variations.length > 1) {
      newvariations = formData.variations.filter((_, i) => i !== index)
    } else {
      newvariations = formData.variations;
    }
    setFormData({
      ...formData,
      variations: newvariations
    });
  }

  const handleRemoveVariationOption = (e, index) => {
    e.preventDefault();
    let newVariationOptions;
    if (formData.variation_options.length > 1) {
      newVariationOptions = formData.variation_options.filter((_, i) => i !== index)
    } else {
      newVariationOptions = formData.variation_options;
    }

    setFormData({
      ...formData,
      variation_options: newVariationOptions

    });
  };
  const handkeImageRemove = (index) => {

    let updated = [...formData.gallery]
    updated.splice(index, 1)
    setFormData({
      ...formData,
      gallery: updated
    })

  }
 
  return (
    <div className={styles.main}>

      <h5 className={styles.heading}>User Registration Form</h5>

      <form className={`${styles.formstyle} `} method="post" >

        <div className='md:grid   lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex  flex-col'>
          <Input text={'name'} onChange={handleChange} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} />
          <Input text={'slug'} onChange={handleChange} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} />
          <Input text={'description'} onChange={handleChange} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={formData.description} />
          <Input text={'quantity'} onChange={handleNumberChange} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={formData.quantity} />
          <Input text={'price'} onChange={handleChange} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} />
          <Input text={'sale_price'} onChange={handleChange} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} />
          <Input text={'brand'} onChange={handleChange} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} />
          <Input text={'weight'} onChange={handleChange} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} />

          <File text={'Image'} onChange={handleImage} typeinput="file" option={false} stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} image={formData.image.original} />

          <Input text={'product_type'} onChange={handleChange} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} />
          <Input text={'min_price'} onChange={handleNumberChange} typeinput="number" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} value={formData.min_price} />
          <Input text={'max_price'} onChange={handleNumberChange} typeinput="number" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} value={formData.max_price} />

          <File text={'gallery'} onChange={handleGalleryImage} typeinput="file" option={true} stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} images={formData.gallery.length} gallery={formData.gallery} onClick={handkeImageRemove} />

          <div className={`md:col-span-2 px-5 mt-3 `}>

            <Select
              isMulti={true}
              value={selectedOptions}
              onChange={handleSelect}
              placeholder="Selected Tags"
              options={options}

            />
          </div>

        </div>


        <div className="">
          {formData.variations.map((option, index) => (
            <div className="mt-10" key={index}>
              <h1 className="text-lg text-center text-black ">Variations Form </h1>
              <div className={`md:grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 flex flex-col   `}>
                <Input text={'attribute_id'} onChange={(e) => { handleVariationNumberChange(e, index) }} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.attribute_id} />
                <Input text={'value'} onChange={(e) => { handleVariationChange(e, index) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.value} />
                <Input text={'slug'} onChange={(e) => { handleVariationAttributeChange(e, index) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} />
                <Input text={'name'} onChange={(e) => { handleVariationAttributeChange(e, index) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={`${styles.containerdivinput} `} />

                <div className={`md:col-span-2 px-5 mt-3 w-5/6 m-auto `}>
                  <Select
                    isMulti={true}
                    value={option?.attribute?.values?.name}
                    onChange={(selectedOptions) => handleSelectAttribute(selectedOptions, index)}
                    placeholder="Selected Attribute"
                    options={attributetab}
                  />
                </div>

              </div>

              <div className="flex w-full justify-around p-10">
                <Button onClick={(e) => removeFormFields(e, index)}
                  styles={`w-1/6 p-2 ml-10 bg-gray-300 ${formData.variations.length > 1 ? 'bg-red-500 opacity-100 text-bold' : ' opacity-50 bg-red-500 cursor-not-allowed'}`}
                  disabled={formData.variations.length <= 1}
                  text={"Remove"}
                />

                <Button onClick={handleAddVariation} styles={"w-1/6 ml-10 bg-gray-300"} text="Add More" />

              </div>
            </div>
          ))}
        </div>

        <div>
          <h1 className="text-lg text-center  ">Variation_Options Form </h1>

          {/* {JSON.stringify(formData.variation_options.length)} */}
          {formData.variation_options.map((option, index) => (
            <div key={index}>
              <div className={`md:grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 flex flex-col`}>
                <Input text={'title'} onChange={(e) => { handleVariationOptionChange(e, index) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.title} />
                <Input text={'price'} onChange={(e) => { handleVariationOptionChange(e, index) }} typeinput="number" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.price} />
                <Input text={'sale_price'} onChange={(e) => { handleVariationOptionChange(e, index) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.sale_price} />
                <Input text={'quantity'} onChange={(e) => { handleVariationOptionNumberChange(e, index) }} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.quantity} />
                <Input text={'is_disable'} onChange={(e) => { handleVariationOptionBoolean(e, index) }} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.is_disable} />
                <Input text={'sku'} onChange={(e) => { handleVariationOptionChange(e, index) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.sku} />
                <div className={`md:col-span-1 px-5 sm:px-0 mt-3 w-5/6 m-auto `}>
                  <Select
                    isMulti={true}
                    value={option.name}
                    onChange={(selectedOption) => handleSelectoption(selectedOption, index)}
                    placeholder=" Select Options"
                    options={tags}

                  />
                </div>

              </div>

              <div className="flex w-full justify-around p-10">

                <Button onClick={(e) => handleRemoveVariationOption(e, index)}
                  styles={`w-1/6 p-2 ml-10 bg-gray-300 ${formData.variation_options.length > 1 ? 'bg-red-500 opacity-100 text-bold' : ' opacity-50 bg-red-500 cursor-not-allowed'}`}
                  disabled={formData.variation_options.length <= 1}
                  text="Remove"
                />
                <Button onClick={handleAddVariationOption} styles="w-1/6 ml-10 p-2 bg-gray-300 " text="Add More" />
              </div>

            </div>
          ))}
        </div>
        <div className="flex justify-end ">

        <Button styles='sm:w-2/6 w-full text-green-500 border-2 bg-green-200 hover:bg-green-300   p-2'  type="submit" onClick={handleSubmit} text={"Save"}></Button>
        </div>
      

      </form>

    </div>
  );
}

export default AddUser;


