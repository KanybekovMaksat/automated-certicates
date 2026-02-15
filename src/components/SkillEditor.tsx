import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SkillEditorProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillEditor({ skills, onChange }: SkillEditorProps) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updated = [...skills, newSkill.trim()];
      onChange(updated);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    onChange(updated);
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-white font-semibold mb-2">Навыки курса</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill) => (
          <div key={skill} className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1">
            {skill}
            <button onClick={() => handleRemoveSkill(skill)}>
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Добавить навык"
          className="flex-1 rounded px-2 py-1 text-black"
        />
        <button
          onClick={handleAddSkill}
          className="bg-green-600 px-3 py-1 rounded text-white"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
