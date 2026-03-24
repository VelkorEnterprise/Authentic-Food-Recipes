import React from 'react';

const KnowledgeNugget: React.FC = () => {
  return (
    <div className="phantom-glass rounded-2xl p-6 mb-12 max-w-4xl mx-auto border-l-4 border-l-brand-teal">
      <h2 className="text-xl font-bold text-brand-teal mb-2 flex items-center">
        <span className="mr-2">💡</span> Quick Answer: How AI Recipe Generation Works
      </h2>
      <p className="text-slate-700 leading-relaxed">
        Our AI Recipe Generator uses advanced machine learning to analyze your available ingredients, dietary needs, and skill level. In milliseconds, it cross-references millions of flavor profiles to output a 100% unique, step-by-step recipe. No signup required, completely free, and optimized for zero food waste.
      </p>
    </div>
  );
};

export default KnowledgeNugget;
