import { teachings } from "./Teaching-Component/Teaching.js";
import Teachings from './Teaching-Component/Teachings.jsx';

const RevWiilyTeachings = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto my-[70px]">
        <h1 className="text-3xl text-[#a52a2a] font-extrabold text-center mb-10">
          Divine Marriage Series
        </h1>
        
        {teachings.map((item) => (
          <Teachings key={item.id} teaching={item} />
        ))}
      </div>
    </div>
  );
};

export default RevWiilyTeachings