// src/components/ui/BrevoChat.tsx
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function BrevoChat() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Brevo widget is loaded
    const checkBrevoWidget = () => {
      const widget = document.getElementById("brevo-conversations");
      const brevoButton = document.querySelector('[class*="brevo"]');

      if (widget || brevoButton || window.BrevoConversations) {
        console.log("✅ Brevo widget detected!");
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    // Initial check
    checkBrevoWidget();

    // Periodic check
    const interval = setInterval(() => {
      if (checkBrevoWidget()) {
        clearInterval(interval);
      }
    }, 2000);

    // Cleanup
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 20000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Brevo Conversations Configuration */}
      <Script
        id="brevo-conversations-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Configure Brevo Conversations before the widget loads
            window.BrevoConversationsSetup = {
              buttonPosition: 'br',
              buttonStyle: 'round',
              chatWidth: 380,
              chatHeight: 600,
              zIndex: 9999,
              colors: {
                buttonBg: '#9101CF',
                buttonText: '#ffffff'
              }
            };

            // Debug logging
            console.log('🔧 Brevo configuration set up');
          `,
        }}
      />

      {/* 
        REPLACE THE CONVERSATION_ID BELOW WITH YOUR ACTUAL BREVO CONVERSATION ID
        
        To get your Brevo Conversations widget code:
        1. Go to your Brevo dashboard (https://app.brevo.com)
        2. Navigate to: Conversations > Settings > Chat widget
        3. Click "Install the chat widget"
        4. Choose "Manually install your chat widget"  
        5. Copy your Conversation ID from the code they provide
        6. Replace 'YOUR_CONVERSATION_ID_HERE' below with your actual ID
        
        The code they give you will look like this:
        window.BrevoConversationsID = 'YOUR_ACTUAL_ID';
      */}
      <Script
        id="brevo-conversations-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Your actual Brevo Conversation ID
            window.BrevoConversationsID = '687fb023f485fc5aa60f6712';
            
            (function(d, w, c) {
              w.BrevoConversationsGlobal = c;
              w[c] = w[c] || function() {
                (w[c].q = w[c].q || []).push(arguments);
              };
              var s = d.createElement('script');
              s.async = true;
              s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
              if (d.head) d.head.appendChild(s);
              
              // Debug logging
              console.log('🚀 Brevo Conversations widget initialized with ID:', window.BrevoConversationsID);
              
              // Check if ID is properly set
              if (window.BrevoConversationsID === 'YOUR_CONVERSATION_ID_HERE') {
                console.error('❌ Please replace YOUR_CONVERSATION_ID_HERE with your actual Brevo Conversation ID');
                
                // Create fallback demo button if ID is not set
                setTimeout(() => {
                  if (!document.getElementById('brevo-conversations')) {
                    var demoButton = document.createElement('div');
                    demoButton.id = 'demo-chat-button';
                    demoButton.innerHTML = '💬';
                    demoButton.style.cssText = 
                      'position: fixed; ' +
                      'bottom: 20px; ' +
                      'right: 20px; ' +
                      'width: 60px; ' +
                      'height: 60px; ' +
                      'background: #9101CF; ' +
                      'border-radius: 50%; ' +
                      'display: flex; ' +
                      'align-items: center; ' +
                      'justify-content: center; ' +
                      'color: white; ' +
                      'font-size: 24px; ' +
                      'cursor: pointer; ' +
                      'z-index: 9999; ' +
                      'box-shadow: 0 4px 12px rgba(145, 1, 207, 0.4); ' +
                      'transition: all 0.3s ease;';
                    
                    demoButton.addEventListener('click', function() {
                      alert('Please add your Brevo Conversation ID!\\n\\nReplace YOUR_CONVERSATION_ID_HERE in BrevoChat.tsx with your actual ID from Brevo dashboard.');
                    });
                    
                    document.body.appendChild(demoButton);
                  }
                }, 2000);
              }
              
            })(document, window, 'BrevoConversations');
          `,
        }}
      />

      {/* Status indicator for loaded state */}
      {/* {isLoaded && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            background: "green",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            zIndex: 10000,
          }}
        >
          ✅ Chat Loaded
        </div>
      )} */}

      {/* Additional positioning and debugging */}
      <Script
        id="brevo-positioning-helper"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            // Helper function to ensure proper positioning
            function ensureBrevoPositioning() {
              // Look for Brevo elements
              const selectors = [
                '#brevo-conversations',
                '[id*="brevo-conversations"]',
                '[class*="brevo-chat"]',
                '[id*="brevo-chat"]',
                '.brevo-conversations'
              ];
              
              let found = false;
              selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                  if (el) {
                    el.style.position = 'fixed';
                    el.style.bottom = '20px';
                    el.style.right = '20px';
                    el.style.zIndex = '9999';
                    found = true;
                  }
                });
              });
              
              return found;
            }
            
            // Run positioning checks
            setTimeout(() => ensureBrevoPositioning(), 1000);
            setTimeout(() => ensureBrevoPositioning(), 3000);
            setTimeout(() => ensureBrevoPositioning(), 5000);
            
            // Debug information
            setTimeout(() => {
              console.log('🔍 Brevo Debug Information:');
              console.log('- Conversation ID:', window.BrevoConversationsID);
              console.log('- Real widget:', document.getElementById('brevo-conversations'));
              console.log('- BrevoConversations function:', typeof window.BrevoConversations);
              console.log('- Window setup:', window.BrevoConversationsSetup);
              
              if (!document.getElementById('brevo-conversations')) {
                if (window.BrevoConversationsID === 'YOUR_CONVERSATION_ID_HERE') {
                  console.warn('⚠️ Using demo mode - Please add your Brevo Conversation ID');
                } else {
                  console.error('❌ Chat widget failed to load. Check your Conversation ID:', window.BrevoConversationsID);
                }
              } else {
                console.log('✅ Brevo chat widget loaded successfully!');
              }
            }, 3000);
          `,
        }}
      />
    </>
  );
}

// Hook for programmatically controlling the chat
export const useBrevoChat = () => {
  const openChat = () => {
    if (typeof window !== "undefined") {
      if (window.BrevoConversations) {
        window.BrevoConversations("openChat", true);
      } else {
        console.log("Brevo Conversations not loaded yet");
      }
    }
  };

  const closeChat = () => {
    if (typeof window !== "undefined" && window.BrevoConversations) {
      window.BrevoConversations("closeChat", true);
    }
  };

  return { openChat, closeChat };
};

// Type declarations
declare global {
  interface Window {
    BrevoConversations?: any;
    BrevoConversationsSetup?: any;
    BrevoConversationsID?: string;
    BrevoConversationsGlobal?: string;
  }
}
