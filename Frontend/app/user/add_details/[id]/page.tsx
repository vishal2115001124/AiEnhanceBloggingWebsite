"use client";
import { add_Details } from "@/app/_lib/action";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import BackgroundStyleFixed from "../../../_Components/backgroundStyle";
import Chatbot from "../../../_Components/chatBot";
import { COUNTRIES } from "../../countries";
import { data } from "../../data";
import LanguageSelector from "../../langSelector";
import CountrySelector from "../../selector";
import { useSession } from "next-auth/react";
import SignOutBtn from "@/app/_Components/signOutButton";
import SubmitButton from "@/app/_Components/submitButton";

function ShuffleArr(data:string[]){
    let shuffleArr:string[]=[];
    for (let i = 0; i < 10; i++) {
        const randomNum = Math.floor(Math.random() * 50) + 1; // Generates a random number between 1 and 50
        shuffleArr.push(data[randomNum]);
      }
    return shuffleArr;

}
export default function Page(){
  const {data:session}=useSession();
  const [selectedLanguage, setSelectedLanguage] = useState(""); 
  const [isOpen, setIsOpen] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
    const [country, setCountry] = useState<string>("IN");
    const [avatars,setAvatars]=useState<string[]>([]);
    const [selectImg,setImg]=useState(session?.user.image);
    const [isEditable, setIsEditable] = useState(false); // State to manage edit toggle
    let itemsArr:string[]=[];

     function genderSelectionFunction(e:any){
        console.log(e.target.value);;
        if(e.target.value==="male"){
            let arrayoftem=ShuffleArr(data.boys)
            setAvatars(arrayoftem);
        }
        else if(e.target.value==="female"){
            let arrayoftem=ShuffleArr(data.girls)
            setAvatars(arrayoftem);
        }
    }
    function SelectProfile(val:any){
        setImg(val.src);
    }
    const bindedData={country,interests,profile_img:selectImg,language:selectedLanguage}
    const customizeFunctionForForm=add_Details.bind(null,bindedData);

    return (
            <main className="flex flex-col items-center">
              <BackgroundStyleFixed/>
              <div className="fixed top-2 right-4"><SignOutBtn/></div>
              <form action={customizeFunctionForForm} className="relative top-4 w-[750px] border py-4 flex flex-col items-center gap-y-4 z-1 bg-white rounded-md">
              <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-600 md:text-4xl">USER PROFILE</h2>
              <div className="grid grid-cols-2 gap-y-4 items-center">
                  {/* Username Row */}
                  <div className="flex items-center">
                    <label
                      htmlFor="username"
                      className="text-gray-800 text-lg w-36 uppercase font-bold"
                    >
                      Username
                    </label>
                  </div>
                  <div className="flex gap-x-2">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className={`bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 ${
                        !isEditable && "cursor-not-allowed opacity-50"
                      }`}
                      placeholder="Username"
                      tabIndex={0}
                      disabled={!isEditable} // Disable the field based on isEditable state
                    />
                    <button
                      type="button"
                      className={`ml-4 text-blue-500 border border-blue-500 rounded-md text-sm px-3 py-1 hover:bg-blue-500 hover:text-white duration-300 ${isEditable?"hidden":""}`}
                      onClick={() => setIsEditable(!isEditable)} // Toggle edit state
                    >
                      {isEditable ? "Lock" : "Edit"}
                    </button>
                  </div>

                  {/* Country Row */}
                  <div className="flex items-center">
                    <label
                      htmlFor="country"
                      className="text-gray-800 text-lg w-36 uppercase font-bold"
                    >
                      Country
                    </label>
                  </div>
                  <div>
                    <CountrySelector
                      id={"country-selector"}
                      open={isOpen}
                      onToggle={() => setIsOpen(!isOpen)}
                      onChange={setCountry}
                      selectedValue={COUNTRIES.find((option) => option.value === country)}
                    />
                  </div>

                  {/* Language Row */}
                  <div className="flex items-center">
                    <label
                      htmlFor="language"
                      className="text-gray-800 text-lg w-36 uppercase font-bold"
                    >
                      Language
                    </label>
                  </div>
                  <div>
                    <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
                  </div>

                  {/* Bio Row */}
                  <div className="flex items-center">
                    <label
                      htmlFor="bio"
                      className="text-gray-800 text-lg w-36 uppercase font-bold"
                    >
                      Bio
                    </label>
                  </div>
                  <div>
                    <textarea
                      name="bio"
                      id="bio"
                      className="w-[300px] h-20 bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5"
                      placeholder="Bio"
                      tabIndex={0}
                    />
                  </div>
              </div>


               <div className="flex gap-x-4 border border-x-0 border border-gray-300 w-full p-4">
                        <div className="flex justify-center items-center">
                            <div className="w-[250px] h-[250px] flex items-center justify-center rounded-full bg-gray-50 border overflow-hidden">
                                {selectImg==""?<h1 className="text-white p-2 bg-black font-bold w-full text-center text-lg">Select Image</h1>:<img src={selectImg} alt=""  className="w-full h-full object-cover"/>}
                            </div>
                        </div>
                        <div>
                            <div className="max-w-[200px] my-4">
                                <label htmlFor="countries_disabled" className="block mb-2 text-sm font-bold text-gray-900 uppercase">Select an option</label>
                                <select id="countries_disabled" name="gender" defaultChecked defaultValue={0} nonce="0"  onChange={genderSelectionFunction} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5">
                                    <option value="0" disabled>Choose your gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="flex items-center ml-0 flex-wrap gap-2">
                                {avatars.map((e,index)=><img key={index} src={e} tabIndex={0} className="max-w-20 max-h-20 focus:p-1 focus:border-2  border-black hover:border-2 hover:p-1 rounded-full duration-100 " onClick={(e)=>SelectProfile(e.target)}/>)}
                            </div>

                        </div>
               </div>
               <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-600 md:text-4xl">INTEREST</h2>
               <CategorySelector interests={interests} setInterests={setInterests}/>
               <SubmitButton label="SAVING..." successMsg="Information submitted" redirectPath="/" classes="px-4 rounded-sm">SAVE</SubmitButton>
               {/* <button className="text-green-400 border border-green-400 rounded-md text-lg px-4 py-1 hover:bg-green-400 hover:text-white duration-500 hover:scale-125 active:scale-75">SAVE</button> */}

        </form>
      <Chatbot/>
        </main>
    )
}

const CategorySelector = ({interests,setInterests}:{interests:string[],setInterests:React.Dispatch<React.SetStateAction<string[]>>}) => {

  
  const categories = [
    "Science",
    "Cyber",
    "Health",
    "God",
    "Culture",
    "Lifestyle",
    "Kids",
    "Awareness",
    "Politics",
  ];

  // Handle adding a category to the selected list
  const handleSelectCategory = (category:string) => {
    if (!interests.includes(category)) {
      setInterests([...interests, category]);
    }
  };

  // Handle removing a category from the selected list
  const handleRemoveCategory = (category:string) => {
    setInterests(interests.filter((interest) => interest !== category));
  };

  // Filter out selected categories from suggestions
  const availableCategories = categories.filter(category => !interests.includes(category));

  return (
    <div className="w-[700px] mx-auto p-6 border rounded-lg ">
      <ul className="flex flex-wrap items-center justify-center gap-1">
        {availableCategories.map((category) => (
          <li
            key={category}
            className="p-2 border bg-gray-200 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-200 hover:scale-105 hover:font-semibold"
            onClick={() => handleSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      {interests.length>0 && <div className="mt-6">
        <h3 className="text-lg font-semibold">Selected Interests:</h3>
        <ul className="flex flex-wrap items-center justify-center gap-1">
          {interests.map((interest, index) => (
            <li
              key={index}
              className="bg-gray-200 p-2 rounded-md flex justify-between items-center"
            >
              <span>{interest}</span>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveCategory(interest)}
              >
                <BiTrash/>
              </button>
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
};
