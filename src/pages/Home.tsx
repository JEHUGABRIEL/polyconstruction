import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  HardHat,
  Ruler,
  PenTool,
  Truck,
  ShieldCheck,
  Clock,
  ThumbsUp,
  Target,
  Eye } from
'lucide-react';
import { motion } from 'framer-motion';
import { useSiteData, Product } from '../context/SiteContext';
import { HeroSlider } from '../components/HeroSlider';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { ProductModal } from '../components/ProductModal';
export function Home() {
  const { settings, services, projects, testimonials, products } = useSiteData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);
  const recentProjects = projects.slice(0, 3);
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const reasons = [
  {
    icon: <Target size={40} className="text-red-600" />,
    title: 'Expertise professionnelle',
    desc: "Une équipe d'ingénieurs et techniciens hautement qualifiés."
  },
  {
    icon: <ThumbsUp size={40} className="text-red-600" />,
    title: 'Travail de qualité',
    desc: 'Des finitions impeccables et des matériaux durables.'
  },
  {
    icon: <Clock size={40} className="text-red-600" />,
    title: 'Respect des délais',
    desc: 'Livraison de vos projets dans les temps impartis.'
  },
  {
    icon: <CheckCircle2 size={40} className="text-red-600" />,
    title: 'Solutions adaptées',
    desc: 'Des réponses sur mesure selon vos besoins et votre budget.'
  }];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool':
        return <PenTool size={32} />;
      case 'FileText':
        return <Ruler size={32} />;
      case 'Droplets':
        return <ShieldCheck size={32} />;
      case 'CheckCircle2':
        return <CheckCircle2 size={32} />;
      default:
        return <HardHat size={32} />;
    }
  };
  return (
    <div className="flex flex-col">
      {/* Hero Section with Slider */}
      <HeroSlider slides={settings.heroSlides.home}>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/services"
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors">
            
            Découvrir nos services
          </Link>
          <Link
            to="/contact"
            className="inline-flex justify-center items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-slate-900 transition-colors">
            
            Demander un devis
          </Link>
        </div>
      </HeroSlider>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            className="text-center mb-16">
            
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Nos Domaines d'Intervention
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              De la conception à la réalisation, nous vous accompagnons à chaque
              étape de votre projet avec professionnalisme.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service, index) =>
            <motion.div
              key={service.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.1
              }}
              className="bg-slate-50 rounded-xl p-8 border border-slate-100 hover:shadow-lg transition-shadow group">
              
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {getIcon(service.iconName)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  {service.description}
                </p>
                <Link
                to="/services"
                className="inline-flex items-center text-red-600 font-medium hover:text-red-700">
                
                  En savoir plus <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex justify-center items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors">
              
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Produits en vedette */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Produits en vedette
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez une sélection de nos meilleurs matériaux disponibles
              dans notre boutique.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) =>
            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.1,
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group cursor-pointer flex flex-col"
              onClick={() => openProductModal(product)}>
              
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                  {!product.inStock &&
                <div className="absolute top-2 right-2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">
                      Rupture
                    </div>
                }
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="text-xl font-bold text-red-600 mb-4">
                    {product.price}
                  </div>

                  <div className="mt-auto pt-4 flex gap-2">
                    <span
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium cursor-pointer transition-colors group-hover:bg-red-600 group-hover:text-white">
                    
                      <Eye size={18} />
                      Détails
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/boutique"
              className="inline-flex justify-center items-center px-8 py-4 border-2 border-slate-900 text-lg font-bold rounded-md text-slate-900 hover:bg-slate-900 hover:text-white transition-colors">
              
              Découvrir plus de produits
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="lg:w-1/2">
              
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Pourquoi nous choisir ?
              </h2>
              <div className="w-24 h-1 bg-red-600 rounded-full mb-8"></div>
              <p className="text-lg text-slate-600 mb-10">
                Chez Poly Construction Services, nous nous engageons à fournir
                l'excellence. Notre réputation s'est construite sur la
                satisfaction de nos clients et la qualité de nos réalisations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {reasons.map((reason, index) =>
                <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">{reason.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">
                        {reason.title}
                      </h4>
                      <p className="text-slate-600">{reason.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              className="lg:w-1/2">
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Ingénieurs sur un chantier"
                  className="w-full h-auto object-cover" />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-8">
                  <div className="bg-white/90 backdrop-blur p-6 rounded-xl inline-block">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        +10
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          Années d'expérience
                        </div>
                        <div className="text-sm text-slate-600">
                          Dans le BTP en RCA
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nos Réalisations Preview */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Nos Réalisations</h2>
              <div className="w-24 h-1 bg-red-600 rounded-full"></div>
            </div>
            <Link
              to="/realisations"
              className="hidden sm:inline-flex items-center text-red-400 hover:text-red-300 font-medium transition-colors">
              
              Voir tous les projets <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentProjects.map((project, index) =>
            <motion.div
              key={project.id}
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.1
              }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
              
                <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-red-400 text-sm font-bold uppercase tracking-wider mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/realisations"
              className="inline-flex items-center text-red-400 hover:text-red-300 font-medium transition-colors">
              
              Voir tous les projets <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ce que disent nos clients
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez les avis de nos clients sur nos prestations.
            </p>
          </div>

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto">
            Contactez notre équipe d'experts dès aujourd'hui pour discuter de
            vos besoins et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${settings.contact.phone1.replace(/\s/g, '')}`}
              className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-md text-red-600 bg-white hover:bg-slate-50 transition-colors shadow-lg">
              
              Appeler le {settings.contact.phone1}
            </a>
            <Link
              to="/contact"
              className="inline-flex justify-center items-center px-8 py-4 border-2 border-white text-lg font-bold rounded-md text-white hover:bg-red-700 transition-colors">
              
              Nous écrire
            </Link>
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} />
      
    </div>);

}