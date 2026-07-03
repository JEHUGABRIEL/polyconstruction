import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData, Product, Project, Testimonial } from '../context/SiteContext';
import {
  Settings,
  Package,
  Briefcase,
  MessageSquare,
  LayoutGrid,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowLeft,
  Home,
  Star,
} from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';
import { ProductFormModal } from '../components/ProductFormModal';
import { ProjectFormModal } from '../components/ProjectFormModal';
import { TestimonialFormModal } from '../components/TestimonialFormModal';
import { ToastContainer, showToast } from '../components/Toast';

const ADMIN_PASSWORD = 'admin123';
const AUTH_KEY = 'pcs_admin_auth';

type ConfirmAction = {
  type: 'delete-product' | 'delete-project' | 'delete-testimonial' | 'logout';
  id?: string;
  label?: string;
} | null;

const TAB_NAMES: Record<string, string> = {
  overview: "Vue d'ensemble",
  products: 'Gestion des Produits',
  projects: 'Réalisations',
  testimonials: 'Témoignages',
  settings: 'Paramètres',
};

export function AdminDashboard() {
  const {
    products,
    projects,
    testimonials,
    settings,
    updateSettings,
    addProduct,
    updateProduct,
    deleteProduct,
    addProject,
    updateProject,
    deleteProject,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useSiteData();

  // Auth state
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem(AUTH_KEY) === 'true');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // App state
  const [activeTab, setActiveTab] = useState('overview');
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Local settings form state
  const [settingsForm, setSettingsForm] = useState({
    phone1: settings.contact.phone1,
    phone2: settings.contact.phone2,
    email: settings.contact.email,
    address: settings.contact.address,
    heroSlides: settings.heroSlides.home.map((s) => ({ ...s })),
  });

  // Sync local form when settings change externally
  useEffect(() => {
    setSettingsForm({
      phone1: settings.contact.phone1,
      phone2: settings.contact.phone2,
      email: settings.contact.email,
      address: settings.contact.address,
      heroSlides: settings.heroSlides.home.map((s) => ({ ...s })),
    });
  }, [settings.contact.phone1, settings.contact.phone2, settings.contact.email, settings.contact.address]);

  const handleSettingsSave = () => {
    updateSettings({
      contact: {
        phone1: settingsForm.phone1,
        phone2: settingsForm.phone2,
        email: settingsForm.email,
        address: settingsForm.address,
      },
      heroSlides: {
        ...settings.heroSlides,
        home: settingsForm.heroSlides,
      },
    });
    showToast('Paramètres enregistrés avec succès');
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true);
      localStorage.setItem(AUTH_KEY, 'true');
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Mot de passe incorrect');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem(AUTH_KEY);
    setConfirmAction(null);
    showToast('Déconnexion réussie');
  };

  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleProductFormSave = (product: Product) => {
    if (editingProduct) {
      updateProduct(product.id, product);
      showToast('Produit modifié avec succès');
    } else {
      addProduct(product);
      showToast('Produit ajouté avec succès');
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleProductFormClose = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  // Delete product handler
  const handleDeleteProduct = () => {
    if (confirmAction?.type === 'delete-product' && confirmAction.id) {
      deleteProduct(confirmAction.id);
      showToast('Produit supprimé avec succès');
    }
    setConfirmAction(null);
  };

  // Project handlers
  const handleOpenEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleProjectFormSave = (project: Project) => {
    if (editingProject) {
      updateProject(project.id, project);
      showToast('Réalisation modifiée avec succès');
    } else {
      addProject(project);
      showToast('Réalisation ajoutée avec succès');
    }
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleProjectFormClose = () => {
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleDeleteProject = () => {
    if (confirmAction?.type === 'delete-project' && confirmAction.id) {
      deleteProject(confirmAction.id);
      showToast('Réalisation supprimée avec succès');
    }
    setConfirmAction(null);
  };

  // Testimonial handlers
  const handleOpenEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowTestimonialForm(true);
  };

  const handleTestimonialFormSave = (testimonial: Testimonial) => {
    if (editingTestimonial) {
      updateTestimonial(testimonial.id, testimonial);
      showToast('Témoignage modifié avec succès');
    } else {
      addTestimonial(testimonial);
      showToast('Témoignage ajouté avec succès');
    }
    setShowTestimonialForm(false);
    setEditingTestimonial(null);
  };

  const handleTestimonialFormClose = () => {
    setShowTestimonialForm(false);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = () => {
    if (confirmAction?.type === 'delete-testimonial' && confirmAction.id) {
      deleteTestimonial(confirmAction.id);
      showToast('Témoignage supprimé avec succès');
    }
    setConfirmAction(null);
  };

  // If not authenticated, show login form
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-4">
              <Lock size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Administration
            </h1>
            <p className="text-slate-400 text-sm">
              Poly Construction Services
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8">
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Identifiant
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value="Administrateur"
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError('');
                  }}
                  placeholder="Entrez le mot de passe"
                  autoFocus
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {loginError && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              Se connecter
            </button>
          </form>

          {/* Back to site link */}
          <div className="p-6 pt-0 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft size={16} />
              Retour au site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: 'overview',
      name: "Vue d'ensemble",
      icon: <LayoutGrid size={20} />,
    },
    { id: 'products', name: 'Boutique', icon: <Package size={20} /> },
    { id: 'projects', name: 'Réalisations', icon: <Briefcase size={20} /> },
    {
      id: 'testimonials',
      name: 'Témoignages',
      icon: <MessageSquare size={20} />,
    },
    { id: 'settings', name: 'Paramètres', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ===== Custom Admin Navbar ===== */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Branding */}
            <div className="flex items-center gap-4">
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <LayoutGrid size={20} />
              </button>

              <div className="flex items-center gap-3">
                <img
                  src="/channels4_profile.jpg"
                  alt="Logo"
                  className="w-8 h-8 rounded-full object-cover border border-slate-700"
                />
                <div className="hidden sm:block">
                  <h1 className="text-base font-bold text-white leading-tight">
                    Poly Construction
                  </h1>
                  <p className="text-xs text-slate-400 leading-tight">
                    Administration
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Current page name */}
            <div className="hidden md:flex items-center">
              <span className="text-sm font-medium text-slate-300 bg-slate-800 px-4 py-1.5 rounded-full">
                {TAB_NAMES[activeTab] || activeTab}
              </span>
            </div>

            {/* Right: Back to site + user */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 rounded-lg hover:bg-red-600 hover:text-white transition-all"
              >
                <Home size={16} />
                <span className="hidden lg:inline">Retour au site</span>
              </Link>
              <button
                onClick={() => setConfirmAction({ type: 'logout' })}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
                title="Déconnexion"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Main layout: Sidebar + Content ===== */}
      <div className="flex">
        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed md:sticky top-16 md:top-16 left-0 z-30 w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col transition-transform duration-300 h-[calc(100vh-4rem)] ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-6 pb-3">
            <h2 className="text-lg font-bold text-white">Navigation</h2>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white border-l-4 border-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>

          {/* Logout in sidebar for mobile */}
          <div className="p-4 border-t border-slate-800 md:hidden">
            <Link
              to="/"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-red-600 hover:text-white transition-colors mb-2"
            >
              <Home size={18} />
              <span className="font-medium">Retour au site</span>
            </Link>
            <button
              onClick={() => setConfirmAction({ type: 'logout' })}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-[calc(100vh-4rem)]">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && (
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
            )}

            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-slate-900">
                    Gestion des Produits
                  </h1>
                  <button
                    onClick={() => setShowProductForm(true)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
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
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded object-cover"
                            />
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
                              className={`px-2 py-1 rounded text-xs font-bold ${
                                product.inStock
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {product.inStock ? 'En stock' : 'Rupture'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleOpenEditProduct(product)}
                              className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() =>
                                setConfirmAction({
                                  type: 'delete-product',
                                  id: product.id,
                                  label: product.name,
                                })
                              }
                              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
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
                        value={settingsForm.phone1}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({
                            ...prev,
                            phone1: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Téléphone 2
                      </label>
                      <input
                        type="text"
                        value={settingsForm.phone2}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({
                            ...prev,
                            phone2: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settingsForm.email}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={settingsForm.address}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                    Textes Hero (Accueil)
                  </h2>
                  {settingsForm.heroSlides.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className="mb-6 pb-6 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0"
                    >
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
                              const newSlides = [...settingsForm.heroSlides];
                              newSlides[idx] = { ...newSlides[idx], title: e.target.value };
                              setSettingsForm((prev) => ({
                                ...prev,
                                heroSlides: newSlides,
                              }));
                            }}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Sous-titre
                          </label>
                          <textarea
                            value={slide.subtitle}
                            onChange={(e) => {
                              const newSlides = [...settingsForm.heroSlides];
                              newSlides[idx] = { ...newSlides[idx], subtitle: e.target.value };
                              setSettingsForm((prev) => ({
                                ...prev,
                                heroSlides: newSlides,
                              }));
                            }}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save button */}
                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleSettingsSave}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm"
                  >
                    <Settings size={18} />
                    Sauvegarder les modifications
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-slate-900">
                    Gestion des Réalisations
                  </h1>
                  <button
                    onClick={() => setShowProjectForm(true)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <Plus size={18} /> Ajouter
                  </button>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-4 font-semibold text-slate-700">
                          Projet
                        </th>
                        <th className="p-4 font-semibold text-slate-700">
                          Catégorie
                        </th>
                        <th className="p-4 font-semibold text-slate-700">Année</th>
                        <th className="p-4 font-semibold text-slate-700 text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr
                          key={project.id}
                          className="border-b border-slate-100 hover:bg-slate-50"
                        >
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <span className="font-medium text-slate-900 block">
                                {project.title}
                              </span>
                              <span className="text-xs text-slate-500 line-clamp-1">
                                {project.description}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-1 rounded text-xs font-bold bg-slate-100 text-slate-700">
                              {project.category}
                            </span>
                          </td>
                          <td className="p-4 text-slate-600">
                            {project.date}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleOpenEditProject(project)}
                              className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() =>
                                setConfirmAction({
                                  type: 'delete-project',
                                  id: project.id,
                                  label: project.title,
                                })
                              }
                              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-slate-900">
                    Gestion des Témoignages
                  </h1>
                  <button
                    onClick={() => setShowTestimonialForm(true)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <Plus size={18} /> Ajouter
                  </button>
                </div>
                <div className="grid gap-4">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                              {testimonial.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900">
                                {testimonial.name}
                              </h3>
                              <p className="text-xs text-slate-500">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5 mb-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={star <= testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            &ldquo;{testimonial.content}&rdquo;
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                          <button
                            onClick={() => handleOpenEditTestimonial(testimonial)}
                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setConfirmAction({
                                type: 'delete-testimonial',
                                id: testimonial.id,
                                label: testimonial.name,
                              })
                            }
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {testimonials.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48 bg-white rounded-xl border border-slate-200 border-dashed">
                      <MessageSquare size={32} className="text-slate-400 mb-3" />
                      <p className="text-slate-500 font-medium">
                        Aucun témoignage pour le moment
                      </p>
                      <p className="text-slate-400 text-sm mt-1">
                        Cliquez sur &quot;Ajouter&quot; pour créer le premier témoignage.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product form modal */}
      <ProductFormModal
        isOpen={showProductForm}
        onClose={handleProductFormClose}
        onSave={handleProductFormSave}
        editProduct={editingProduct}
      />

      {/* Project form modal */}
      <ProjectFormModal
        isOpen={showProjectForm}
        onClose={handleProjectFormClose}
        onSave={handleProjectFormSave}
        editProject={editingProject}
      />

      {/* Testimonial form modal */}
      <TestimonialFormModal
        isOpen={showTestimonialForm}
        onClose={handleTestimonialFormClose}
        onSave={handleTestimonialFormSave}
        editTestimonial={editingTestimonial}
      />

      <ToastContainer />

      {/* Confirm modals */}
      <ConfirmModal
        isOpen={confirmAction?.type === 'delete-product'}
        title="Supprimer le produit"
        message={`Êtes-vous sûr de vouloir supprimer "${confirmAction?.label ?? 'ce produit'}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleDeleteProduct}
        onCancel={() => setConfirmAction(null)}
      />

      <ConfirmModal
        isOpen={confirmAction?.type === 'delete-project'}
        title="Supprimer la réalisation"
        message={`Êtes-vous sûr de vouloir supprimer "${confirmAction?.label ?? 'cette réalisation'}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleDeleteProject}
        onCancel={() => setConfirmAction(null)}
      />

      <ConfirmModal
        isOpen={confirmAction?.type === 'delete-testimonial'}
        title="Supprimer le témoignage"
        message={`Êtes-vous sûr de vouloir supprimer le témoignage de "${confirmAction?.label ?? 'ce client'}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleDeleteTestimonial}
        onCancel={() => setConfirmAction(null)}
      />

      <ConfirmModal
        isOpen={confirmAction?.type === 'logout'}
        title="Déconnexion"
        message="Êtes-vous sûr de vouloir vous déconnecter de l'interface d'administration ?"
        confirmLabel="Se déconnecter"
        cancelLabel="Annuler"
        variant="danger"
        onConfirm={handleLogout}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
}
