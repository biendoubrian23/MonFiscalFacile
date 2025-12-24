"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Calendar, Clock, ArrowRight, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

// Catégories d'articles
const categories = [
  { id: "all", label: "Tous les articles", count: 1 },
  { id: "deductions", label: "Déductions fiscales", count: 1 },
  { id: "frais-reels", label: "Frais réels", count: 0 },
  { id: "declaration", label: "Déclaration", count: 0 },
  { id: "conseils", label: "Conseils pratiques", count: 0 },
];

// Articles (données statiques pour l'instant)
const articles = [
  {
    id: 1,
    title: "Les 10 réductions d'impôts les plus oubliées par les salariés",
    excerpt: "Découvrez les déductions fiscales que 79% des salariés ne connaissent pas et comment en bénéficier facilement.",
    category: "deductions",
    categoryLabel: "Déductions fiscales",
    date: "20/12/2025",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop"
  },
];

// Couleurs des catégories
const categoryColors: Record<string, string> = {
  "deductions": "bg-primary-500",
  "frais-reels": "bg-blue-500",
  "declaration": "bg-amber-500",
  "conseils": "bg-purple-500",
};

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer les articles
  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-offwhite">
      <Header />

      {/* Hero Section avec image de fond */}
      <section className="relative pt-16">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2090&auto=format&fit=crop')" 
          }}
        />
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="relative py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Actualités & Conseils Fiscaux
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Restez informé des dernières actualités fiscales, découvrez nos conseils 
              pour optimiser votre déclaration et économiser sur vos impôts.
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">2025</p>
                <p className="text-sm text-gray-400">Actualités</p>
              </div>
              <div className="w-px h-12 bg-gray-600" />
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{articles.length}</p>
                <p className="text-sm text-gray-400">Articles</p>
              </div>
              <div className="w-px h-12 bg-gray-600" />
              <div className="text-center">
                <p className="text-3xl font-bold text-white">Mise à jour</p>
                <p className="text-sm text-gray-400">Régulière</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar - Catégories */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="bg-white border border-gray-200 p-6 sticky top-24">
                {/* Recherche */}
                <div className="relative mb-6">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Liste des catégories */}
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-slate uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-primary-500" />
                    Catégories
                  </h3>
                  <ul className="space-y-1">
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-all ${
                            selectedCategory === cat.id
                              ? "bg-primary-50 text-primary-600 font-medium"
                              : "text-slate hover:bg-gray-50 hover:text-charcoal"
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className={`text-xs px-2 py-0.5 ${
                            selectedCategory === cat.id
                              ? "bg-primary-500 text-white"
                              : "bg-gray-100 text-slate"
                          }`}>
                            {cat.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Réseaux sociaux */}
                <div className="p-4 bg-gray-50">
                  <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-3">
                    Suivez-nous
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href="https://twitter.com/monfiscalfacile" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white flex items-center justify-center text-slate hover:text-charcoal hover:shadow-md transition-all"
                    >
                      <Twitter size={20} />
                    </a>
                    <a 
                      href="https://linkedin.com/company/monfiscalfacile" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white flex items-center justify-center text-slate hover:text-[#0A66C2] hover:shadow-md transition-all"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Liste des articles */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-charcoal">
                  {selectedCategory === "all" ? "Tous les articles" : categories.find(c => c.id === selectedCategory)?.label}
                  <span className="text-slate font-normal ml-2">({filteredArticles.length})</span>
                </h2>
              </div>

              {/* Grille d'articles */}
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <article 
                    key={article.id}
                    className="bg-white overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Image */}
                    <div 
                      className="relative h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url('${article.image}')` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      {/* Badge catégorie */}
                      <span className={`absolute top-4 left-4 ${categoryColors[article.category]} text-white text-xs font-medium px-3 py-1`}>
                        {article.categoryLabel}
                      </span>
                    </div>
                    
                    {/* Contenu */}
                    <div className="p-5">
                      <h3 className="font-semibold text-charcoal mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-slate">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {article.readTime}
                          </span>
                        </div>
                        <Link 
                          href={`/articles/${article.id}`}
                          className="flex items-center gap-1 text-primary-500 text-sm font-medium hover:gap-2 transition-all"
                        >
                          Lire
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Message si aucun résultat */}
              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate">Aucun article trouvé pour cette recherche.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
