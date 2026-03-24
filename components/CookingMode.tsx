import React, { useState, useEffect, useRef } from 'react';
import { Recipe } from '../types';

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = recipe.instructions[currentStepIndex];

  // Try to extract time from the current step (e.g., "for 10 minutes", "boil for 5 mins")
  useEffect(() => {
    const timeMatch = currentStep.match(/(\d+)\s*(minute|min|m|hour|hr|h)s?/i);
    if (timeMatch) {
      const amount = parseInt(timeMatch[1], 10);
      const unit = timeMatch[2].toLowerCase();
      let seconds = 0;
      if (unit.startsWith('m')) {
        seconds = amount * 60;
      } else if (unit.startsWith('h')) {
        seconds = amount * 3600;
      }
      if (seconds > 0) {
        setTimerSeconds(seconds);
        setIsTimerRunning(false);
      } else {
        setTimerSeconds(null);
        setIsTimerRunning(false);
      }
    } else {
      setTimerSeconds(null);
      setIsTimerRunning(false);
    }
  }, [currentStepIndex, currentStep]);

  useEffect(() => {
    if (isTimerRunning && timerSeconds !== null && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Play a sound or show an alert when timer finishes
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(e => console.log("Audio play failed", e));
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const nextStep = () => {
    if (currentStepIndex < recipe.instructions.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col text-slate-900 font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold truncate pr-4 text-slate-900">{recipe.recipeName}</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close Cooking Mode"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Ingredients Sidebar (hidden on small screens, toggleable or just visible on large) */}
        <div className="hidden md:block w-1/3 lg:w-1/4 bg-slate-100 p-6 overflow-y-auto border-r border-slate-200">
          <h3 className="text-xl font-semibold mb-4 text-brand-teal">Ingredients</h3>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-brand-orange mr-2">•</span>
                <span className="text-slate-700 text-lg">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instruction Area */}
        <div className="flex-1 flex flex-col p-6 md:p-12 overflow-y-auto relative">
          <div className="text-brand-teal font-bold text-xl mb-4 tracking-widest uppercase">
            Step {currentStepIndex + 1} of {recipe.instructions.length}
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight md:leading-snug text-slate-900">
              {currentStep}
            </p>
          </div>

          {/* Timer Section */}
          {timerSeconds !== null && (
            <div className="mt-8 p-6 bg-white rounded-2xl flex flex-col items-center justify-center border border-slate-200 shadow-sm">
              <div className={`text-6xl md:text-8xl font-mono font-bold mb-6 ${timerSeconds === 0 ? 'text-red-500 animate-pulse' : 'text-slate-900'}`}>
                {formatTime(timerSeconds)}
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={toggleTimer}
                  className={`px-8 py-4 rounded-full font-bold text-xl transition-colors ${
                    isTimerRunning 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-brand-teal hover:bg-brand-teal-dark text-white'
                  }`}
                >
                  {timerSeconds === 0 ? 'Done' : isTimerRunning ? 'Pause' : 'Start Timer'}
                </button>
                <button 
                  onClick={() => {
                    setIsTimerRunning(false);
                    // Re-trigger the useEffect to reset timer
                    const timeMatch = currentStep.match(/(\d+)\s*(minute|min|m|hour|hr|h)s?/i);
                    if (timeMatch) {
                      const amount = parseInt(timeMatch[1], 10);
                      const unit = timeMatch[2].toLowerCase();
                      let seconds = 0;
                      if (unit.startsWith('m')) seconds = amount * 60;
                      else if (unit.startsWith('h')) seconds = amount * 3600;
                      setTimerSeconds(seconds);
                    }
                  }}
                  className="px-8 py-4 rounded-full font-bold text-xl bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-6 border-t border-slate-200 bg-white flex justify-between items-center shadow-sm">
        <button 
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className="px-6 py-4 rounded-xl font-bold text-lg flex items-center bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        
        {/* Mobile Ingredients Toggle (Optional, but good for UX) */}
        <div className="md:hidden text-slate-500 text-sm">
          {currentStepIndex + 1} / {recipe.instructions.length}
        </div>

        <button 
          onClick={nextStep}
          disabled={currentStepIndex === recipe.instructions.length - 1}
          className="px-6 py-4 rounded-xl font-bold text-lg flex items-center bg-brand-teal text-white hover:bg-brand-teal-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CookingMode;
