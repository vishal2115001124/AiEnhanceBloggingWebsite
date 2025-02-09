"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { addnewBlog } from "../_lib/action";
import { getUserDetails } from "../middleware/userData";

export default function PostEditor() {
    const {data:Session,status}=useSession();
    const user = Session?.user;
    const [content, setContent] = useState([]);
    const [nextId, setNextId] = useState(1);
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [desc, setDesc] = useState(""); // New state for description
    const [category, setCategory] = useState(""); // New state for category
    const [draggingIndex, setDraggingIndex] = useState<null|number>(null);

    const addComponent = (con_type: any) => {
        setContent((e): any => [...e, { id: nextId, con_type, data: "" }]);
        setNextId(nextId + 1);
    };

    const removeComponent = (id: number) => {
        setContent(content.filter((item: any) => item.id !== id));
    };

    const updateComponentValue = (id: number, data: any): any => {
        setContent((e): any =>
            content.map((item: any) =>
                item.id === id ? { ...item, data } : item
            )
        );
    };

    const handleDragStart = (index: number) => {
        setDraggingIndex((e)=>index);
    };

    const handleDragOver = (event: React.DragEvent, index: number) => {
        event.preventDefault();
        if (draggingIndex === index && draggingIndex===null) return;

        const updatedContent = [...content];

        const [draggedItem] = updatedContent.splice(draggingIndex??1, 1); // Remove the dragging item
        updatedContent.splice(index, 0, draggedItem); // Insert it at the new position

        setDraggingIndex(index);
        setContent(updatedContent);
    };

    const handleDragEnd = () => {
        setDraggingIndex(null);
    };

    `function modifiedAddPostAction(){
       
    }`

    return (
        <form action={addnewBlog} className="w-full p-4 bg-white rounded-md shadow-md duration-400">
            <div className="mb-4">
                <label htmlFor="category" className="block mb-2 font-bold">Category:</label>
                <select
                    id="category"
                    value={category}
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                >
                    <option value="" unselectable={"off"}>Select a category</option>
                    <option value="science">Science</option>
                    <option value="cyber">Cyber</option>
                    <option value="health">Health</option>
                    <option value="god">God</option>
                    <option value="culture">Culture</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="kids">Kids</option>
                    <option value="awareness">Awareness</option>
                    <option value="politics">Politics</option>
                    <option value="other">Other</option>
                </select>
            </div>
             <div className="mb-4">
                <label htmlFor="title" className="block mb-2 font-bold">Title:</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your title"
                    className="w-full p-2 border rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="thumbnail" className="block mb-2 font-bold">Thumbnail URL:</label>
                <input
                    id="thumbnail"
                    type="text"
                    name="thumbnail"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    placeholder="Enter thumbnail URL"
                    className="w-full p-2 border rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="desc" className="block mb-2 font-bold">Description:</label>
                <textarea
                    id="desc"
                    name="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Enter a brief description..."
                    className="w-full p-2 border rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <button onClick={() => addComponent("heading")} className="mr-2 bg-yellow-500 text-white p-2 rounded-md">Add Heading</button>
                <button onClick={() => addComponent("paragraph")} className="mr-2 bg-yellow-500 text-white p-2 rounded-md">Add Paragraph</button>
                <button onClick={() => addComponent("file")} className="bg-yellow-500 text-white p-2 rounded-md">Add Image</button>
            </div>

            {content.map((item: any, index: number) => (
                <div
                    key={item.id}
                    className={`mb-4 p-2 border rounded-md cursor-move duration-400 ${draggingIndex === index ? "opacity-50" : "opacity-100"}`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex justify-between items-center">
                        
                        <label className="font-bold">{item.con_type}</label>
                        <div className="flex space-x-2">
                            <FaEdit className="text-green-500 cursor-pointer" />
                            <BiTrash className="text-red-500 cursor-pointer" onClick={() => removeComponent(item.id)} />
                        </div>
                    </div>
                    {
                    item.con_type=="file"?<><ImagePreviewPlusLoader item={item} updateComponentValue={updateComponentValue} /></>:
                        item.con_type=="heading"?
                        <input
                            type="text"
                            value={item.data}
                            name={item.con_type+"_"+item.id}
                            onChange={(e) => updateComponentValue(item.id, e.target.value)}
                            placeholder={`Enter ${item.con_type} content`}
                            className="w-full mt-2 p-2 border rounded-md"
                            required
                        />:
                        <textarea

                        value={item.data}
                        name={item.con_type+"_"+item.id}
                        onChange={(e) => updateComponentValue(item.id, e.target.value)}
                        placeholder={`Enter ${item.con_type} content`}
                        className="w-full mt-2 p-2 border rounded-md"
                        required
                        
                        ></textarea>
                        }
                </div>
            ))}

            <div className="mt-6">
                <button className="bg-green-500 text-white p-2 rounded-md disabled:bg-gray-500 duration-300">Submit Post</button>
            </div>
        </form>
    );
}



function ImagePreviewPlusLoader({item,updateComponentValue}:{item:any,updateComponentValue:Function}){
    const [image,setImage]=useState("");
    function handleImagePreview(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
    }

  return (
    <div className="flex items-center justify-around">
                        {image && <img src={image} alt={"Image"} className="max-h-[200px]"/>}
                        <label  htmlFor={item.con_type+"_"+item.id} className="flex flex-col items-center justify-center pt-5 pb-6 hover:bg-white hover:cursor-pointer rounded-md duration-300">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </label>
                        <input id={item.con_type+"_"+item.id} 
                        name={item.con_type+"_"+item.id} 
                        type="file" className="hidden" accept="/image/*"  
                        onChange={(e) => {handleImagePreview(e);updateComponentValue(item.id, e.target.value)}} 
                        />
    </div>
  )
}