import React, { useEffect, useState, createContext, useContext } from 'react';
export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  inStock: boolean;
  description: string;
  featured?: boolean;
};
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
};
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
};
export type Service = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
};
export type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
};
export type SiteSettings = {
  contact: {
    phone1: string;
    phone2: string;
    email: string;
    address: string;
  };
  heroSlides: {
    home: Slide[];
    services: Slide[];
    shop: Slide[];
    contact: Slide[];
    realisations: Slide[];
  };
};
type SiteContextType = {
  products: Product[];
  projects: Project[];
  testimonials: Testimonial[];
  services: Service[];
  settings: SiteSettings;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
};
const defaultProducts: Product[] = [
{
  id: '1',
  name: 'Ciment Portland CEM II 42.5',
  category: 'Matériaux de base',
  price: '12 500 FCFA',
  image:
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  inStock: true,
  description:
  'Ciment de haute qualité idéal pour tous vos travaux de maçonnerie et de béton armé. Résistance garantie.',
  featured: true
},
{
  id: '2',
  name: 'Fer à béton HA 12mm',
  category: 'Armatures',
  price: '4 500 FCFA / barre',
  image:
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  inStock: true,
  description:
  "Barres d'armature à haute adhérence pour renforcer vos structures en béton.",
  featured: true
},
{
  id: '3',
  name: 'Briques pleines 20x20x40',
  category: 'Maçonnerie',
  price: '450 FCFA / unité',
  image:
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  inStock: true,
  description:
  'Briques pleines robustes pour la construction de murs porteurs et de cloisons.',
  featured: true
},
{
  id: '4',
  name: 'Sable fin de rivière',
  category: 'Agrégats',
  price: '15 000 FCFA / m³',
  image:
  'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  inStock: true,
  description:
  'Sable fin lavé, parfait pour les enduits et les finitions de qualité.'
},
{
  id: '5',
  name: 'Gravier concassé 15/25',
  category: 'Agrégats',
  price: '25 000 FCFA / m³',
  image:
  'https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  inStock: false,
  description:
  'Gravier concassé propre pour la préparation de béton résistant.'
},
{
  id: '6',
  name: 'Tôles bac aluminium 0.5mm',
  category: 'Couverture',
  price: '6 500 FCFA / ml',
  image:
  'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  inStock: true,
  description:
  'Tôles de couverture durables et résistantes à la corrosion pour protéger vos bâtiments.'
}];

const defaultProjects: Project[] = [
{
  id: '1',
  title: 'Construction Immeuble R+4',
  category: 'Bâtiment',
  description:
  "Réalisation complète d'un immeuble résidentiel et commercial au centre-ville de Bangui.",
  image:
  'https://images.unsplash.com/photo-1541888081622-15cb2a061487?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  date: '2023'
},
{
  id: '2',
  title: 'Rénovation Villa Moderne',
  category: 'Rénovation',
  description:
  "Rénovation intégrale d'une villa avec aménagement paysager et piscine.",
  image:
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  date: '2024'
},
{
  id: '3',
  title: 'Assainissement Quartier Sud',
  category: 'Travaux Publics',
  description:
  "Mise en place d'un réseau de drainage et d'assainissement pour prévenir les inondations.",
  image:
  'https://images.unsplash.com/photo-1504307651254-35680f356f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  date: '2023'
}];

const defaultTestimonials: Testimonial[] = [
{
  id: '1',
  name: 'Jean-Paul M.',
  role: 'Propriétaire',
  content:
  'Poly Construction a réalisé ma maison avec un professionnalisme exemplaire. Les délais ont été respectés et la qualité est au rendez-vous.',
  rating: 5
},
{
  id: '2',
  name: 'Marie K.',
  role: "Directrice d'Entreprise",
  content:
  "Nous avons fait appel à leurs services pour nos nouveaux bureaux. L'équipe est réactive, à l'écoute et très compétente.",
  rating: 5
},
{
  id: '3',
  name: 'Alain D.',
  role: 'Investisseur',
  content:
  'Un partenaire de confiance pour mes projets immobiliers en RCA. Je recommande vivement leur expertise en ingénierie.',
  rating: 4
}];

const defaultServices: Service[] = [
{
  id: 'architecture',
  iconName: 'PenTool',
  title: 'Architecture',
  description:
  'Conception architecturale innovante et fonctionnelle. Nous créons des espaces qui répondent à vos besoins tout en respectant les normes.',
  features: [
  'Plans 2D et 3D',
  "Design d'intérieur",
  'Aménagement paysager',
  'Rénovation']

},
{
  id: 'etude',
  iconName: 'FileText',
  title: 'Étude & Ingénierie',
  description:
  'Études techniques approfondies pour garantir la solidité et la viabilité de vos ouvrages. Nos ingénieurs calculent et dimensionnent chaque élément.',
  features: [
  'Études de sol',
  'Calculs de structure',
  "Études d'impact",
  'Devis estimatifs']

},
{
  id: 'assainissement',
  iconName: 'Droplets',
  title: 'Assainissement',
  description:
  'Solutions complètes pour la gestion des eaux usées et pluviales, garantissant un environnement sain et durable pour vos constructions.',
  features: [
  "Réseaux d'égouts",
  'Fosses septiques',
  'Drainage',
  'Traitement des eaux']

},
{
  id: 'permis',
  iconName: 'CheckCircle2',
  title: 'Permis de bâtir',
  description:
  "Nous prenons en charge toutes les démarches administratives pour l'obtention de votre permis de construire auprès des autorités compétentes.",
  features: [
  'Constitution du dossier',
  'Suivi administratif',
  'Mise aux normes',
  'Conseil juridique']

}];

const defaultSettings: SiteSettings = {
  contact: {
    phone1: '+236 74 21 22 89',
    phone2: '+236 75 72 62 44',
    email: 'contact@polyconstructionservices.cf',
    address: 'Bangui, République Centrafricaine'
  },
  heroSlides: {
    home: [
    {
      id: 'h1',
      title: "Bâtissons ensemble l'avenir de la Centrafrique",
      subtitle:
      "Poly Construction Services (P.C.S - BTP) est votre partenaire privilégié pour tous vos projets d'architecture, d'ingénierie et de construction."
    },
    {
      id: 'h2',
      title: 'Expertise et Qualité au service de vos projets',
      subtitle:
      'Des fondations aux finitions, nous garantissons un travail rigoureux et durable.'
    },
    {
      id: 'h3',
      title: 'Des solutions sur mesure pour chaque client',
      subtitle:
      'Nous adaptons nos services pour répondre précisément à vos besoins et à votre budget.'
    }],

    services: [
    {
      id: 's1',
      title: 'Nos Services',
      subtitle:
      'Une expertise complète dans tous les domaines du Bâtiment et des Travaux Publics.'
    },
    {
      id: 's2',
      title: 'De la conception à la réalisation',
      subtitle: 'Nous vous accompagnons à chaque étape de votre projet.'
    }],

    shop: [
    {
      id: 'sh1',
      title: 'Boutique de Matériaux',
      subtitle:
      'Découvrez notre sélection de matériaux de construction de première qualité.'
    },
    {
      id: 'sh2',
      title: 'Fourniture fiable et rapide',
      subtitle:
      'Tout ce dont vous avez besoin pour vos chantiers, livré à temps.'
    }],

    contact: [
    {
      id: 'c1',
      title: 'Contactez-nous',
      subtitle:
      'Notre équipe est à votre disposition pour répondre à toutes vos questions et étudier vos projets.'
    }],

    realisations: [
    {
      id: 'r1',
      title: 'Nos Réalisations',
      subtitle:
      'Découvrez nos projets achevés et notre savoir-faire en action.'
    },
    {
      id: 'r2',
      title: 'Des ouvrages qui durent',
      subtitle:
      'La qualité de notre travail se reflète dans chacune de nos constructions.'
    }]

  }
};
const SiteContext = createContext<SiteContextType | undefined>(undefined);
export function SiteProvider({ children }: {children: ReactNode;}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Load from localStorage or use defaults
    const storedProducts = localStorage.getItem('pcs_products');
    const storedProjects = localStorage.getItem('pcs_projects');
    const storedTestimonials = localStorage.getItem('pcs_testimonials');
    const storedServices = localStorage.getItem('pcs_services');
    const storedSettings = localStorage.getItem('pcs_settings');
    setProducts(storedProducts ? JSON.parse(storedProducts) : defaultProducts);
    setProjects(storedProjects ? JSON.parse(storedProjects) : defaultProjects);
    setTestimonials(
      storedTestimonials ? JSON.parse(storedTestimonials) : defaultTestimonials
    );
    setServices(storedServices ? JSON.parse(storedServices) : defaultServices);
    setSettings(storedSettings ? JSON.parse(storedSettings) : defaultSettings);
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pcs_products', JSON.stringify(products));
      localStorage.setItem('pcs_projects', JSON.stringify(projects));
      localStorage.setItem('pcs_testimonials', JSON.stringify(testimonials));
      localStorage.setItem('pcs_services', JSON.stringify(services));
      localStorage.setItem('pcs_settings', JSON.stringify(settings));
    }
  }, [products, projects, testimonials, services, settings, isLoaded]);
  const addProduct = (product: Product) => setProducts([...products, product]);
  const updateProduct = (id: string, updated: Partial<Product>) =>
  setProducts(
    products.map((p) =>
    p.id === id ?
    {
      ...p,
      ...updated
    } :
    p
    )
  );
  const deleteProduct = (id: string) =>
  setProducts(products.filter((p) => p.id !== id));
  const addProject = (project: Project) => setProjects([...projects, project]);
  const updateProject = (id: string, updated: Partial<Project>) =>
  setProjects(
    projects.map((p) =>
    p.id === id ?
    {
      ...p,
      ...updated
    } :
    p
    )
  );
  const deleteProject = (id: string) =>
  setProjects(projects.filter((p) => p.id !== id));
  const updateSettings = (updated: Partial<SiteSettings>) =>
  setSettings({
    ...settings,
    ...updated
  });
  return (
    <SiteContext.Provider
      value={{
        products,
        projects,
        testimonials,
        services,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        addProject,
        updateProject,
        deleteProject,
        updateSettings
      }}>
      
      {children}
    </SiteContext.Provider>);

}
export function useSiteData() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return context;
}