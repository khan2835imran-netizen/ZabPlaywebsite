import React, { useState } from 'react';
import { Star, ThumbsUp, ShieldCheck, MessageSquarePlus, User, CheckCircle2 } from 'lucide-react';
import { UserReview } from '../types';

interface ReviewsSectionProps {
  reviews: UserReview[];
  lang: 'en' | 'hi';
  onAddReview: (review: Omit<UserReview, 'id' | 'date' | 'helpfulCount'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  lang,
  onAddReview,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  const handleHelpfulClick = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) return;

    onAddReview({
      userName: reviewerName,
      rating: reviewRating,
      title: reviewTitle || (lang === 'hi' ? 'शानदार ऐप!' : 'Great Video Player!'),
      comment: reviewComment,
      verifiedDownload: true,
    });

    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{lang === 'hi' ? 'यूजर रेटिंग और रिव्यूज' : 'Ratings & User Reviews'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === 'hi' ? 'यूजर्स का अनुभव और समीक्षा' : 'Verified Ratings & Feedback'}
            </h2>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition cursor-pointer self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{showReviewForm ? (lang === 'hi' ? 'फॉर्म बंद करें' : 'Close Form') : (lang === 'hi' ? 'अपना रिव्यू लिखें' : 'Write a Review')}</span>
          </button>
        </div>

        {/* Rating Breakdown Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center flex flex-col items-center justify-center shadow-xl">
            <span className="text-5xl font-extrabold text-white mb-2">4.9</span>
            <div className="flex items-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'hi' ? '18,450+ सत्यापित रेटिंग्स पर आधारित' : 'Based on 18,450+ Verified Ratings'}
            </p>
          </div>

          <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-center space-y-2">
            {[
              { stars: 5, pct: '92%' },
              { stars: 4, pct: '6%' },
              { stars: 3, pct: '1%' },
              { stars: 2, pct: '0.5%' },
              { stars: 1, pct: '0.5%' },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-slate-400 font-semibold">{row.stars} ★</span>
                <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: row.pct }}
                  ></div>
                </div>
                <span className="w-10 text-right text-slate-400 font-medium">{row.pct}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Add Review Form */}
        {showReviewForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-slate-900 border border-blue-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-blue-400" />
              <span>{lang === 'hi' ? 'जै प्ले ऐप के लिए अपना रिव्यू सबमिट करें' : 'Submit Your Review for Jai Play'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'hi' ? 'आपका नाम' : 'Your Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'hi' ? 'स्टार रेटिंग दें' : 'Star Rating'}
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 cursor-pointer hover:scale-125 transition"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'hi' ? 'रिव्यू का शीर्षक (Title)' : 'Review Title'}
              </label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="e.g. Best HD Video Player App!"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'hi' ? 'आपकी समीक्षा (Comment)' : 'Detailed Feedback'} *
              </label>
              <textarea
                rows={3}
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Write what you liked about Jai Play app..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 bg-slate-800 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg"
              >
                {lang === 'hi' ? 'सबमिट रिव्यू' : 'Post Review'}
              </button>
            </div>
          </form>
        )}

        {/* User Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => {
            const addedHelpful = helpfulCounts[rev.id] || 0;
            return (
              <div
                key={rev.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-white">{rev.userName}</span>
                          {rev.verifiedDownload && (
                            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {lang === 'hi' ? 'सत्यापित' : 'Verified'}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-slate-200 mb-1">{rev.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    className="flex items-center gap-1.5 hover:text-blue-400 transition cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'hi' ? 'मददगार रहा' : 'Helpful'} ({rev.helpfulCount + addedHelpful})
                    </span>
                  </button>

                  <span className="text-[10px] text-slate-500">Jai Play v2.4.0 User</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
