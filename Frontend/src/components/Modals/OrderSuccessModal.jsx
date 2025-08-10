import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ClipboardCheck, X } from 'lucide-react'; 

const OrderSuccessModal = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    let countdownTimer;
    
    if (isOpen) {
      setCountdown(5);
      
      countdownTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            onClose(); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.2,
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    },
    tap: { scale: 0.95 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl max-w-[360px] md:max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/10 to-lime-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <motion.button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              whileHover={{ rotate: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <X size={24} />
            </motion.button>
            
            <motion.div 
              className="relative z-10 mx-auto w-20 h-20 my-4 bg-white rounded-full flex items-center justify-center shadow-lg"
              variants={iconVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-400 rounded-full opacity-10"></div>
              <ClipboardCheck size={32} className="text-green-500" strokeWidth={2} />
            </motion.div>
            
            <div className="relative z-10 px-8 pb-8 pt-2">
              <motion.h2 
                className="text-xl font-bold text-center text-gray-900 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Order Placed Successfully!
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-gray-600 text-center mb-1">
                  Your order has been successfully placed and is being processed.
                </p>
                <p className="text-gray-600 text-center mb-1">
                  This modal will close automatically in <span className="font-bold text-green-500">{countdown}</span> seconds.
                </p>
                <hr className='my-4'/>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderSuccessModal;