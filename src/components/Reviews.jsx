import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Stuart Galloway',
    rating: 5,
    date: 'a year ago',
    text: 'Great guys . Fitted new windows/door and facia for us . Superb job .',
    source: 'Google'
  },
  {
    name: 'David Craig Murray',
    rating: 5,
    date: '2 years ago',
    text: 'Absolutely delighted with the garden room Derek and his team have built for us. They exceeded every expectation we had and built our room quicker than expected to an extremely high standard. Price was extremely competitive. The payment process was risk averse and straightforward. Extremely competent, trustworthy, attended exactly when they said they would, diligent, tidy and competitive. A 5 star recommendation has been earned.',
    source: 'Google'
  },
  {
    name: 'Michael North',
    rating: 5,
    date: '4 years ago',
    text: 'Really pleased with our new garden room, built to a really high standard by Derek and Ethan. Would highly recommend them, honest, talented and reliable guys.',
    source: 'Google'
  },
  {
    name: 'Anonymous',
    rating: 5,
    date: '2 years ago',
    text: 'Absolutely delighted with the garden room Derek and his team have built for us. They exceeded every expectation we had and built our room quicker than expected to an extremely high standard. Price was extremely competitive. The payment process was risk averse and straightforward. Extremely competent, trustworthy, attended exactly when they said they would, diligent, tidy and competitive. A 5 star recommendation has been earned.',
    source: 'Google'
  }
];

export default function Reviews() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 line-clamp-4">{review.text}</p>
              <div className="border-t border-gray-700 pt-3">
                <p className="text-white font-semibold text-sm">{review.name}</p>
                <p className="text-gray-500 text-xs">{review.date} • {review.source}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            87 garden rooms built in Glasgow since 2022
          </p>
        </div>
      </div>
    </motion.section>
  );
}

