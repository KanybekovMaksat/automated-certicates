import { useState } from 'react';
import { Plus, X, GripVertical, Sparkles } from 'lucide-react';
import { PRESET_SKILLS } from '../types';

interface SkillEditorProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillEditor({ skills, onChange }: SkillEditorProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (skillName: string) => {
    const trimmed = skillName.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setNewSkill('');
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const moveSkill = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= skills.length) return;
    const newSkills = [...skills];
    const [moved] = newSkills.splice(fromIndex, 1);
    newSkills.splice(toIndex, 0, moved);
    onChange(newSkills);
  };

  const addPresetSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      onChange([...skills, skill]);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-yellow-400" size={24} />
          <h2 className="text-2xl font-bold text-white">
            Навыки курса
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({skills.length}{' '}
              {skills.length === 1
                ? 'навык'
                : skills.length < 5
                  ? 'навыка'
                  : 'навыков'}
              )
            </span>
          </h2>
        </div>
      </div>

      <div className="mb-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
        <p className="text-gray-400 text-sm mb-2">Быстрый выбор:</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_SKILLS.map((skill) => (
            <button
              key={skill}
              onClick={() => addPresetSkill(skill)}
              disabled={skills.includes(skill)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                skills.includes(skill)
                  ? 'bg-gray-600 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/40 hover:text-blue-200'
              }`}
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-700 rounded-lg">
            <p>Нет добавленных навыков</p>
            <p className="text-sm mt-1">
              Добавьте навыки вручную или выберите из шаблонов
            </p>
          </div>
        )}

        {skills.map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className="flex items-center gap-2 bg-gray-700 rounded-lg p-3 group"
          >

            <span className="flex-1 text-white font-medium">{skill}</span>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => moveSkill(index, index - 1)}
                disabled={index === 0}
                className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                title="Вверх"
              >
                ↑
              </button>
              <button
                onClick={() => moveSkill(index, index + 1)}
                disabled={index === skills.length - 1}
                className="p-1 text-gray-400 hover:text-white disabled:opacity-30"
                title="Вниз"
              >
                ↓
              </button>
            </div>

            <button
              onClick={() => removeSkill(index)}
              className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill(newSkill);
            }
          }}
          placeholder="Введите название навыка..."
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => addSkill(newSkill)}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Добавить
        </button>
      </div>
    </div>
  );
}
