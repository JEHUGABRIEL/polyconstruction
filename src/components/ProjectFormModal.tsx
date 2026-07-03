import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image } from 'lucide-react';
import { Project } from '../context/SiteContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  editProject?: Project | null;
};

const emptyForm = {
  title: '',
  category: '',
  description: '',
  image: '',
  date: '',
};

export function ProjectFormModal({ isOpen, onClose, onSave, editProject }: Props) {
  const [form, setForm] = useState({ ...emptyForm });
  const [imagePreview, setImagePreview] = useState('');

  // Pré-remplir le formulaire en mode édition
  useEffect(() => {
    if (editProject) {
      setForm({
        title: editProject.title,
        category: editProject.category,
        description: editProject.description,
        image: editProject.image,
        date: editProject.date,
      });
      setImagePreview(editProject.image || '');
    } else {
      setForm({ ...emptyForm });
      setImagePreview('');
    }
  }, [editProject]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Prévisualisation image
    if (name === 'image' && value) {
      setImagePreview(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    const project: Project = {
      id: editProject ? editProject.id : Date.now().toString(),
      title: form.title,
      category: form.category || 'Général',
      description: form.description,
      image: form.image || 'https://images.unsplash.com/photo-1541888081622-15cb2a061487?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      date: form.date || new Date().getFullYear().toString(),
    };

    onSave(project);
    handleClose();
  };

  const handleClose = () => {
    setForm({ ...emptyForm });
    setImagePreview('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">
                {editProject ? "Modifier la réalisation" : "Ajouter une réalisation"}
              </h3>
              <button
                onClick={handleClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-6 flex-1 space-y-5"
            >
              {/* Ligne 1 : Titre + Catégorie */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Titre du projet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="ex: Construction Immeuble R+4"
                    required
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="ex: Bâtiment, Rénovation..."
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
              </div>

              {/* Ligne 2 : Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Année / Date
                </label>
                <input
                  type="text"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="ex: 2024"
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>

              {/* Ligne 3 : Image */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  URL de l'image
                </label>
                <div className="relative">
                  <Image
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
                {imagePreview && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Prévisualisation"
                      className="w-14 h-14 rounded-lg object-cover border border-slate-200"
                      onError={() => setImagePreview('')}
                    />
                    <span className="text-xs text-slate-400">
                      Prévisualisation
                    </span>
                  </div>
                )}
              </div>

              {/* Ligne 4 : Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description du projet..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                />
              </div>

              {/* Footer buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  {editProject ? "Enregistrer les modifications" : "Ajouter la réalisation"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
