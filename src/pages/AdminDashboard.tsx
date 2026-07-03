import React, { useState } from 'react';
import { useSiteData } from '../context/SiteContext';
import {
  Settings,
  Package,
  Briefcase,
  MessageSquare,
  LayoutGrid,
  Plus,
  Edit2,
  Trash2 } from
'lucide-react';
export function AdminDashboard() {
  const { products, projects, testimonials, settings, updateSettings } =
  useSiteData();
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
  {
    id: 'overview',
    name: "Vue d'ensemble",
    icon: <LayoutGrid size={20} />
  },
  {
    id: 'products',
    name: 'Boutique',
    icon: <Package size={20} />
  },
  {
    id: 'projects',
    name: 'Réalisations',
    icon: <Briefcase size={20} />
  },
  {
    id: 'testimonials',
    name: 'Témoignages',
    icon: <MessageSquare size={20} />
  },
  {
    id: 'settings',
    name: 'Paramètres',
    icon: <Settings size={20} />
  }];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white">Administration</h2>
          <p className="text-slate-400 text-sm">Poly Construction</p>
        </div>
        <nav className="mt-6">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === tab.id ? 'bg-red-600 text-white border-l-4 border-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}>
            
              {tab.icon}
              <span className="font-medium">{tab.name}</span>
            </button>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'overview' &&
          <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-8">
                Tableau de bord
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-700">Produits</h3>
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <Package size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">
                    {products.length}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-700">Réalisations</h3>
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                      <Briefcase size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">
                    {projects.length}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-700">Témoignages</h3>
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900">
                    {testimonials.length}
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-blue-800 font-bold mb-2">Information</h3>
                <p className="text-blue-700">
                  Ceci est une interface d'administration simplifiée. Les
                  modifications effectuées ici sont sauvegardées dans le
                  navigateur (localStorage) et se reflètent immédiatement sur le
                  site public.
                </p>
              </div>
            </div>
          }

          {activeTab === 'products' &&
          <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                  Gestion des Produits
                </h1>
                <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  <Plus size={18} /> Ajouter
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 font-semibold text-slate-700">
                        Produit
                      </th>
                      <th className="p-4 font-semibold text-slate-700">
                        Catégorie
                      </th>
                      <th className="p-4 font-semibold text-slate-700">Prix</th>
                      <th className="p-4 font-semibold text-slate-700">
                        Statut
                      </th>
                      <th className="p-4 font-semibold text-slate-700 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) =>
                  <tr
                    key={product.id}
                    className="border-b border-slate-100 hover:bg-slate-50">
                    
                        <td className="p-4 flex items-center gap-3">
                          <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover" />
                      
                          <span className="font-medium text-slate-900">
                            {product.name}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">
                          {product.category}
                        </td>
                        <td className="p-4 text-slate-900 font-medium">
                          {product.price}
                        </td>
                        <td className="p-4">
                          <span
                        className={`px-2 py-1 rounded text-xs font-bold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        
                            {product.inStock ? 'En stock' : 'Rupture'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          }

          {activeTab === 'settings' &&
          <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-8">
                Paramètres du site
              </h1>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  Coordonnées
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone 1
                    </label>
                    <input
                    type="text"
                    value={settings.contact.phone1}
                    onChange={(e) =>
                    updateSettings({
                      contact: {
                        ...settings.contact,
                        phone1: e.target.value
                      }
                    })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone 2
                    </label>
                    <input
                    type="text"
                    value={settings.contact.phone2}
                    onChange={(e) =>
                    updateSettings({
                      contact: {
                        ...settings.contact,
                        phone2: e.target.value
                      }
                    })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                    type="email"
                    value={settings.contact.email}
                    onChange={(e) =>
                    updateSettings({
                      contact: {
                        ...settings.contact,
                        email: e.target.value
                      }
                    })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Adresse
                    </label>
                    <input
                    type="text"
                    value={settings.contact.address}
                    onChange={(e) =>
                    updateSettings({
                      contact: {
                        ...settings.contact,
                        address: e.target.value
                      }
                    })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                  
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                  Textes Hero (Accueil)
                </h2>
                {settings.heroSlides.home.map((slide, idx) =>
              <div
                key={slide.id}
                className="mb-6 pb-6 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                
                    <h4 className="font-semibold text-slate-700 mb-3">
                      Slide {idx + 1}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                          Titre
                        </label>
                        <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => {
                        const newSlides = [...settings.heroSlides.home];
                        newSlides[idx].title = e.target.value;
                        updateSettings({
                          heroSlides: {
                            ...settings.heroSlides,
                            home: newSlides
                          }
                        });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                    
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                          Sous-titre
                        </label>
                        <textarea
                      value={slide.subtitle}
                      onChange={(e) => {
                        const newSlides = [...settings.heroSlides.home];
                        newSlides[idx].subtitle = e.target.value;
                        updateSettings({
                          heroSlides: {
                            ...settings.heroSlides,
                            home: newSlides
                          }
                        });
                      }}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
                      rows={2} />
                    
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div>
          }

          {(activeTab === 'projects' || activeTab === 'testimonials') &&
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-slate-200 border-dashed">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <Settings size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                Module en construction
              </h3>
              <p className="text-slate-500">
                Cette section de l'administration sera bientôt disponible.
              </p>
            </div>
          }
        </div>
      </div>
    </div>);

}