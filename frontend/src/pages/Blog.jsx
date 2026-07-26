import React, { useState, useEffect } from 'react';
import { API_BASE } from '../context/AuthContext.jsx';
import { Calendar, User, ArrowLeft, Bookmark, Heart, Send, MessageSquare, BookOpen } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/blogs`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
        }
      } catch (err) {
        console.error('Error fetching blog articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      
      {/* HEADER CONTROLLER */}
      {!selectedPost && (
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary dark:text-secondary flex items-center justify-center space-x-1">
            <BookOpen size={14} />
            <span>The Sweet Digest</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-textColor-light dark:text-textColor-dark leading-none">
            Stories & Recipes
          </h1>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">
            Get a sneak peek behind our bakers ovens, learn food chemistry, and find the perfect coffee matches.
          </p>
        </div>
      )}

      {/* RENDER VIEW */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="donut-spinner"></div>
        </div>
      ) : selectedPost ? (
        /* SINGLE ARTICLE READING MODE */
        <article className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          {/* Back trigger */}
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-xs font-bold text-textColor-light/60 hover:text-primary dark:text-textColor-dark/60 dark:hover:text-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Articles</span>
          </button>

          {/* Featured Image */}
          <div className="h-96 rounded-[40px] overflow-hidden shadow-xl border border-cream dark:border-darkBg-light">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-xs text-textColor-light/60 dark:text-textColor-dark/60 font-semibold">
              <span className="flex items-center space-x-1">
                <Calendar size={14} className="text-primary" />
                <span>{formatDate(selectedPost.publishedAt)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <User size={14} className="text-primary" />
                <span>{selectedPost.author}</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-textColor-light dark:text-textColor-dark leading-tight">
              {selectedPost.title}
            </h1>
          </div>

          {/* Content Body */}
          <div className="text-sm text-textColor-light/90 dark:text-textColor-dark/90 leading-relaxed space-y-6 pt-4 border-t border-cream dark:border-darkBg-light">
            {selectedPost.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Interactive bottom bar */}
          <div className="border-t border-b border-cream dark:border-darkBg-light py-4 flex items-center justify-between text-textColor-light/50 dark:text-textColor-dark/50 text-xs">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <Heart size={16} />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                <MessageSquare size={16} />
                <span>Comment</span>
              </button>
            </div>
            <button className="flex items-center space-x-1 hover:text-secondary transition-colors">
              <Bookmark size={16} />
              <span>Bookmark</span>
            </button>
          </div>
        </article>
      ) : (
        /* ARTICLES GRID LIST */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id || post._id}
              onClick={() => setSelectedPost(post)}
              className="bg-cream-light dark:bg-darkCard rounded-3xl overflow-hidden border border-cream dark:border-darkBg-light shadow-sm hover:shadow-lg hover-lift cursor-pointer flex flex-col h-full group"
            >
              {/* Cover */}
              <div className="h-56 bg-cream-dark dark:bg-darkBg overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 bg-primary text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Story
                </span>
              </div>

              {/* Text */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-textColor-light/50 dark:text-textColor-dark/50">
                    <Calendar size={12} />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-cream dark:border-darkBg-light pt-4 text-xs font-bold text-primary dark:text-secondary">
                  <span>Read Article &rarr;</span>
                  <span className="text-[10px] text-textColor-light/50 dark:text-textColor-dark/50 font-medium">
                    {post.author.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Blog;
