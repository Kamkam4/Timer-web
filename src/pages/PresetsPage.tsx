import React, { useContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimerContext } from '../context/TimerContext';
import Modal from '../components/Modal';
import './PresetsPage.css';
import { FiCoffee, FiMoon, FiClock, FiBookOpen, FiZap, FiHeart, FiPlay, FiTarget } from 'react-icons/fi';
import { GiKnifeFork } from "react-icons/gi";

// აღვწეროთ ტიპები ჩვენი მონაცემებისთვის
interface PresetItem {
  name: string;
  icon: ReactNode;
  duration: number;
}

interface PresetCategory {
  id: string;
  title: string;
  items: PresetItem[];
}

// შევქმნათ ერთი, სწორად ტიპიზირებული მონაცემების მასივი
const presetsData: PresetCategory[] = [
  { id: 'common', title: 'ძირითადი', items: [
    { name: 'ყავის შესვენება', icon: <FiCoffee />, duration: 900 },
    { name: 'ვახშმობა', icon: <GiKnifeFork />, duration: 2700 },
    { name: 'ძილი', icon: <FiMoon />, duration: 28800 },
  ]},
  { id: 'custom', title: 'მორგებული', items: [
    { name: 'კონცენტრაციის სესია', icon: <FiTarget />, duration: 1500 },
    { name: 'მოკლე ძილი', icon: <FiZap />, duration: 1200 },
    { name: 'კითხვა', icon: <FiBookOpen />, duration: 1800 },
  ]},
  { id: 'other', title: 'სხვა', items: [
    { name: 'მედიტაცია', icon: <FiHeart />, duration: 600 },
    { name: 'ვარჯიში', icon: <FiPlay />, duration: 3600 },
    { name: 'მეცადინეობა', icon: <FiClock />, duration: 5400 },
  ]},
];

const PresetsPage: React.FC = () => {
  const timerContext = useContext(TimerContext);
  const navigate = useNavigate();
  
  const [isModalOpen, setModalOpen] = useState(false);
  
  if (!timerContext) return null;
  const { isRunning } = timerContext;

  const handlePresetClick = (duration: number) => {
    if (isRunning) {
      setModalOpen(true);
    } else {
      navigate(`/?duration=${duration}`);
    }
  };
  
  return (
    <div className="presets-container">
      <div className="presets-header"><h1>შაბლონები</h1></div>
      
      {presetsData.map(category => (
        <section key={category.id} className="preset-category">
          <h2>{category.title}</h2>
          <div className="presets-grid">
            {category.items.map(item => (
              <div 
                key={item.name} 
                className="preset-card" 
                onClick={() => handlePresetClick(item.duration)}
              >
                {item.icon} {item.name}
              </div>
            ))}
          </div>
        </section>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 style={{ marginTop: 0 }}>ტაიმერი მიმდინარეობს</h2>
        <p style={{ color: '#a0a0a0', lineHeight: 1.6 }}>
          სასურველი შაბლონის ასარჩევად გამორთე წინა ტაიმერი.
        </p>
        <button 
            className="modal-button"
            style={{ marginTop: '20px' }} 
            onClick={() => setModalOpen(false)}
        >
          კარგი
        </button>
      </Modal>
    </div>
  );
};

export default PresetsPage;