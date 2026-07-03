import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image } from 'lucide-react';
import { Product } from '../context/SiteContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  editProduct?: Product | null;
};

const emptyForm = {
  name: '',
  category: '',
  price: '',
  image: '',
  description: '',
  inStock: true,
  featured: false,
};

export function ProductFormModal({ isOpen, onClose, onSave, editProduct }: Props) {
  const [form, setForm] = useState({ ...emptyForm });
  const [imagePreview, setImagePreview] = useState('');

  // Pré-remplir le formulaire en mode édition
  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        category: editProduct.category,
        price: editProduct.price,
        image: editProduct.image,
        description: editProduct.description,
        inStock: editProduct.inStock,
        featured: editProduct.featured ?? false,
      });
      setImagePreview(editProduct.image || '');
    } else {
      setForm({ ...emptyForm });
      setImagePreview('');
    }
  }, [editProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Prévisualisation image
    if (name === 'image' && value) {
      setImagePreview(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const product: Product = {
      id: editProduct ? editProduct.id : Date.now().toString(),
      name: form.name,
      category: form.category || 'Général',
      price: form.price,
      image: form.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: form.description,
      inStock: form.inStock,
      featured: form.featured,
    };

    onSave(product);
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
                {editProduct ? 'Modifier le produit' : 'Ajouter un produit'}
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
              {/* Ligne 1 : Nom + Catégorie */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="product-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Nom du produit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    name="name"
                    autoComplete="off"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="ex: Ciment Portland"
                    required
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="product-category" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    id="product-category"
                    name="category"
                    autoComplete="off"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="ex: Matériaux de base"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
              </div>

              {/* Ligne 2 : Prix */}
              <div>
                <label htmlFor="product-price" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Prix <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="product-price"
                  name="price"
                  autoComplete="off"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="ex: 12 500 FCFA"
                  required
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>

              {/* Ligne 3 : Image */}
              <div>
                <label htmlFor="product-image" className="block text-sm font-medium text-slate-700 mb-1.5">
                  URL de l'image
                </label>
                <div className="relative">
                  <Image
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="url"
                    id="product-image"
                    name="image"
                    autoComplete="url"
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
                <label htmlFor="product-description" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea
                  id="product-description"
                  name="description"
                  autoComplete="off"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description du produit..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                />
              </div>

              {/* Ligne 5 : Options */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="product-inStock"
                    name="inStock"
                    checked={form.inStock}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-slate-700">En stock</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    id="product-featured"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-slate-700">Mis en avant</span>
                </label>
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
                  {editProduct ? 'Enregistrer les modifications' : 'Ajouter le produit'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
