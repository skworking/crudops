import React, { useEffect, useState } from 'react'
import styles from "../page.module.css";
import Image from 'next/image';
import { IoIosCloseCircle } from 'react-icons/io';
import Select from 'react-select'
const Editdetails = (props) => {
    const {data,oncancel,onUpdate}=props;
    console.log(data);
    const [selectedOptions, setSelectedOptions] = useState([]|data.tag);
    const [selectedOptionsAttribute, setSelectedOptionsAttribute] = useState([] );
    
    // const selectedOptionsatt = data?.variations?.flatMap(variation =>
    //   variation.attribute.values.map(value => ({
    //       value: value.attribute_id,
    //       label: variation.value
    //     }))
    //   );
       console.log(selectedOptionsAttribute);
    useEffect(()=>{
        setSelectedOptions(data.tag.map((tag=>({value:tag.name,label:tag.slug}))))
        // setSelectedOptionsAttribute(data?.variations?.attribute.values?.map((item=>  item)))
        setSelectedOptionsAttribute(data?.variations?.flatMap(variation =>
          variation?.attribute?.values?.map(value => ({
              value: value.attribute_id,
              label: variation.value
            }))
          ))
    },[data?.tag])

    /// this value add manualy now thake come from redux latter
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    const attributetab = [
        { value: '12oz', label: '12oz', id: "3" },
        { value: '24oz', label: '24oz', id: "3" },
        { value: '36oz', label: '36oz', id: "3" },
    
      ]
    
    const tags = [
        { value: 'Phone', label: 'phone' },
        { value: 'Apple', label: 'apple' },
        { value: 'Cilantro', label: 'cilantro' },
        { value: 'Smart TV', label: 'smart-tv' }
      ];
    

    const [formData, setFormData] = useState({
        id:data._id,
        name: data?.name ,
        slug:  data?.slug,
        description:data?.description,
        image: {
          thumbnail: data?.image?.thumbnail || '',
          original: data?.image?.original || ''
        },
        gallery:data.gallery,
        tag:data.tag,
        quantity:data.quantity,
        price:data.price,
        sale_price:data.sale_price,
        brand:data.brand,
        weight:data.weight,
        min_price:data.min_price,
        max_price:data.max_price,
        variations:data.variations,
        variation_options:data.variation_options       
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

      const handleImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        console.log("file", file);
        // Create a new FileReader instance
        const reader = new FileReader();
      
        reader.onload = () => {
          setFormData(prevState => ({
            ...prevState,
    
            image: {
              ...prevState.image,
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
      console.log(formData);
      const handkeImageRemove=(index)=>{
      
       let updated=[...formData.gallery]
        updated.splice(index,1)
        setFormData({
            ...formData,
            gallery:updated
        })
       
      }

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
              quantity: '',
              is_disable: '',
              sku: '',
              options: []
            },
          ],
        });
      };
    
      const handleSelectAttribute = (selectedOption, index) => {
   
        const attributeOptions = selectedOption.map(option => ({
          attribute_id: option?.id, // Assuming label corresponds to the name property in options
          value: option?.value
        }));
        // setSelectedOptionsAttribute(selectedOption)
        setFormData(prevFormData => {
          const updatedVariationOptions = [...prevFormData.variations]
          updatedVariationOptions[index].attribute.values = attributeOptions;
          console.log(updatedVariationOptions);
          return {
            ...prevFormData,
            variations: updatedVariationOptions
          };
        })
    
      }
    
      const removeFormFields = (index) => {
        console.log(index);
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
      const handleRemoveVariationOption = (index) => {
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
    return (
    <div>
        <h1 className={styles.heading}>Record Details Edit({formData.id})</h1>
        
        <div className=''>
         
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
          <label className={styles.containerdivright}>

            <input className={`${styles.containerdivinput} `}
              type="file"
              
              accept=".png,.jpg"
              name="image"
              onChange={handleImage}
              
            />

            <div className="flex p-2 gap-2 ">
              {formData.image && formData.image !== '' &&

                <Image src={formData?.image?.original} width={100} height={100} />
              }
            </div>

           </label>
            <div className={`${styles.containerdivright} flex  flex-col`}>
                Select Multiple Image 
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
                    formData.gallery.map((item,index) => {
                    // console.log(item);
                    return (
                        <div key={item._id} 
                    
                        className="w-[100px]  flex flex-col justify-between text-center flex-wrap">

                        <Image src={item?.original} className="  object-contain" width={200} height={100} />
                        <IoIosCloseCircle  
                            className='cursor-pointer m-3 hover:fill-white'
                            onClick={()=>{handkeImageRemove(index)}}/>
                        
                        </div>

                    )
                    })
                }
                </div>
            </div>

            <section className={styles.containerdivright}>
                <Select
                isMulti={true}
                value={selectedOptions}
                onChange={handleSelect}
                placeholder="Selected Tags"
                options={options}

                />
            </section>
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
         {formData?.variations?.map((option, index) => (
            <form className="mt-10">
              <h1 className="text-lg text-center text-black ">Variations Form </h1>
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
                    value={selectedOptionsAttribute}
                    onChange={(selectedOptions) => handleSelectAttribute(selectedOptions, index)}
                    placeholder="Selected Attribute"
                    options={attributetab}
                  />
                </label>
              </div>
              <div className="flex w-full justify-around p-10">

                <button onClick={handleAddVariation} className="w-1/6 ml-10 bg-gray-300 ">Add More</button>

                <button onClick={() => removeFormFields(index)}
                  className={`w-1/6 p-2 ml-10 bg-gray-300 ${formData.variations.length > 1 ? 'bg-red-500 opacity-100 text-bold' : ' opacity-50 bg-red-500 cursor-not-allowed'}`}
                  disabled={formData.variations.length <= 1}
                >
                  Remove
                </button>
              </div>
            </form>
          ))}

          
        <div>
          <h1 className="text-lg text-center  ">Variation_Options Form </h1>

          {/* {JSON.stringify(formData.variation_options.length)} */}
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
                    onChange={(selectedOption) => handleSelectoption(selectedOption, index)}
                    placeholder=" Select Options"
                    options={tags}

                  />
                </label>
              </div>

              <div className="flex w-full justify-around p-10">
                <button onClick={handleAddVariationOption} className="w-1/6 ml-10 p-2 bg-gray-300 ">Add More</button>

                <button onClick={() => handleRemoveVariationOption(index)}
                  className={`w-1/6 p-2 ml-10 bg-gray-300 ${formData.variation_options.length > 1 ? 'bg-red-500 opacity-100 text-bold' : ' opacity-50 bg-red-500 cursor-not-allowed'}`}
                  disabled={formData.variation_options.length <= 1}
                >
                  Remove
                </button>
              </div>

            </div>
          ))}
        </div>
        </div>
    </div>
  )
}

export default Editdetails;
