import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Sun } from "lucide-react";

interface Law {
  id: number;
  text: string;
}

interface LawsCategory {
  id: string;
  name: string;
  emoji: string;
  laws: Law[];
}

const lawsData: LawsCategory[] = [
  {
    id: "city",
    name: "قوانين المدينة",
    emoji: "🏙️",
    laws: [
      { id: 1, text: "يمنع القتل العشوائي ويسمح فقط خارج المنطقة الآمنة." },
      { id: 2, text: "يمنع الدهس أو الصدم العشوائي." },
      { id: 3, text: "يمنع استخدام أسماء بذيئة." },
      { id: 4, text: "يمنع رد الغلط بالغلط، احفظ تصويرك وافتح تكت." },
      { id: 5, text: "يمنع استفزاز اللاعبين بقصد التصوير ورفع شكوى كيدية." },
      { id: 6, text: "يمنع ارتداء الملابس العسكرية مهما كان السبب." },
      { id: 7, text: "يمنع استخدام سكنات الحزم في السيناريوهات والفايتات." },
      { id: 8, text: "يجب تشغيل برنامج التصوير اثناء اللعب." },
      { id: 9, text: "يمنع التدخل في سيناريو قائم." },
      { id: 10, text: "يمنع منعاً باتاً سرقة سيارة وزارة الصحة." },
      { id: 11, text: "يمنع كلبشة الشخص وهو ميت مهما كان السبب." },
      { id: 12, text: "يمنع إهانة اللاعب بأي شكل من الأشكال." },
      { id: 13, text: "التحلي بالذوق والأدب ومراعاة مشاعر الآخرين." },
      { id: 14, text: "يمنع عمل سبام بالشات مهما كان السبب." },
    ],
  },
  {
    id: "discord",
    name: "قوانين الديسكورد",
    emoji: "💬",
    laws: [
      { id: 1, text: "احترم جميع أعضاء السيرفر." },
      { id: 2, text: "لا تنشر محتوى غير لائق." },
      { id: 3, text: "لا تقم بالإزعاج أو الإساءة للآخرين." },
    ],
  },
  {
    id: "scenarios",
    name: "قوانين السيناريوهات",
    emoji: "⚔️",
    laws: [
      { id: 1, text: "يجب اتباع القصة المرسومة للسيناريو." },
      { id: 2, text: "لا تحاول الهروب من السيناريو." },
      { id: 3, text: "احترم قرارات مدير السيناريو." },
    ],
  },
  {
    id: "gangs",
    name: "قوانين العصابات والمنظمات",
    emoji: "👥",
    laws: [
      { id: 1, text: "يجب أن تكون لديك رتبة معينة للقيام بأعمال العصابة." },
      { id: 2, text: "احترم هيكل القيادة في عصابتك." },
      { id: 3, text: "لا تخون عصابتك." },
    ],
  },
  {
    id: "ministries",
    name: "قوانين الوزارات والقطاعات",
    emoji: "🏛️",
    laws: [
      { id: 1, text: "يجب اتباع البروتوكول الرسمي للوزارة." },
      { id: 2, text: "احترم سلسلة القيادة." },
      { id: 3, text: "لا تساء استخدام صلاحياتك الوزارية." },
    ],
  },
  {
    id: "store",
    name: "قوانين المتجر",
    emoji: "🛍️",
    laws: [],
  },
];

const storeSubcategories = [
  {
    id: "store-general",
    name: "القوانين العامة للمتجر",
    emoji: "📋",
    laws: [
      { id: 1, text: "يجب احترام أسعار المتجر المحددة من قبل الإدارة." },
      { id: 2, text: "لا يسمح بالتفاوض على الأسعار." },
      { id: 3, text: "يجب الالتزام بساعات عمل المتجر." },
    ],
  },
  {
    id: "store-trading",
    name: "قوانين التداول والبيع",
    emoji: "💰",
    laws: [
      { id: 1, text: "يجب التحقق من صحة العملة قبل القبول." },
      { id: 2, text: "لا يسمح بالتداول خارج المتجر الرسمي." },
      { id: 3, text: "يجب توثيق جميع العمليات التجارية." },
    ],
  },
  {
    id: "store-security",
    name: "قوانين الأمان والحماية",
    emoji: "🔒",
    laws: [
      { id: 1, text: "يجب حماية الأموال والبضائع من السرقة." },
      { id: 2, text: "لا يسمح بدخول الأشخاص المريبين للمتجر." },
      { id: 3, text: "يجب الإبلاغ عن أي محاولة سرقة فوراً." },
    ],
  },
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("city");

  // حفظ تفضيل الوضع في localStorage
  useEffect(() => {
    const saved = localStorage.getItem("vibesrp-dark-mode");
    if (saved !== null) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  // تحديث localStorage عند تغيير الوضع
  useEffect(() => {
    localStorage.setItem("vibesrp-dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const filteredLaws = lawsData
    .find((cat) => cat.id === activeCategory)
    ?.laws.filter((law) =>
      law.text.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const filteredStoreLaws = storeSubcategories
    .flatMap((sub) =>
      sub.laws.map((law) => ({
        ...law,
        subcategory: sub.name,
        emoji: sub.emoji,
      }))
    )
    .filter((law) =>
      law.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // الألوان حسب الوضع
  const colors = isDarkMode
    ? {
        bg: "#050308",
        bgSecondary: "#1a0520",
        bgTertiary: "#3d0a2a",
        text: "#ffffff",
        textSecondary: "#d4d4d4",
        textMuted: "#999999",
        border: "#3d0a2a",
        accent: "#d4307a",
        accentLight: "#f5a8d8",
        button: "#1a93fe",
        buttonHover: "#1487fa",
      }
    : {
        bg: "#f8f0f5",
        bgSecondary: "#fce4ec",
        bgTertiary: "#f3e5f5",
        text: "#5a3a5a",
        textSecondary: "#7a5a7a",
        textMuted: "#b0909b",
        border: "#e8c5d8",
        accent: "#d4307a",
        accentLight: "#f5a8d8",
        button: "#d4307a",
        buttonHover: "#c71f6e",
      };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.bg,
        color: colors.text,
        transition: "all 0.3s ease",
      }}
    >
      {/* Background with overlay */}
      {isDarkMode && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -10,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1200&h=400&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            opacity: 0.3,
          }}
        ></div>
      )}

      {/* Header */}
      <header
        style={{
          position: "relative",
          zIndex: 40,
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: isDarkMode ? `${colors.bg}cc` : `${colors.bg}cc`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1rem" }}>
          {/* Title Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  color: colors.text,
                  textShadow: isDarkMode
                    ? "rgba(0, 0, 0, 0.7) 0px 2px 15px"
                    : "rgba(90, 58, 90, 0.2) 0px 2px 10px",
                  margin: 0,
                }}
              >
                VibesRP
              </h1>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: colors.textMuted,
                  textShadow: isDarkMode
                    ? "rgba(0, 0, 0, 0.5) 0px 1px 10px"
                    : "rgba(90, 58, 90, 0.1) 0px 1px 5px",
                  margin: "0.25rem 0 0 0",
                }}
              >
                القوانين الرسمية
              </p>
            </div>

            {/* Status and Theme Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "9999px",
                  boxShadow: "rgba(34, 197, 94, 0.4) 0px 0px 10px",
                }}
              >
                <span
                  style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "50%",
                    backgroundColor: "#25ba3b",
                    animation: "pulse 2s infinite",
                  }}
                ></span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#25ba3b",
                  }}
                >
                  نشط الآن
                </span>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                  padding: "0.5rem",
                  borderRadius: "50%",
                  border: `1px solid ${colors.border}`,
                  backgroundColor: isDarkMode ? colors.bgTertiary : colors.bgTertiary,
                  color: colors.text,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  width: "40px",
                  height: "40px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? colors.bgTertiary
                    : colors.bgTertiary;
                }}
                title={isDarkMode ? "تبديل للوضع الفاتح" : "تبديل للوضع الداكن"}
              >
                {isDarkMode ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <button
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: colors.button,
                color: "white",
                fontWeight: "500",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.buttonHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.button;
              }}
            >
              🎮 العب الآن
            </button>
            <button
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: `1px solid ${colors.border}`,
                backgroundColor: "transparent",
                color: colors.textSecondary,
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.bgTertiary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              💬 الديسكورد
            </button>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="ابحث عن قانون..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: colors.bgSecondary,
              border: `1px solid ${colors.border}`,
              color: colors.text,
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main style={{ position: "relative", zIndex: 20, maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Category Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2rem",
            justifyContent: "center",
          }}
        >
          {lawsData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: `1px solid ${colors.border}`,
                backgroundColor:
                  activeCategory === category.id ? colors.accent : "transparent",
                color:
                  activeCategory === category.id ? "white" : colors.textSecondary,
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "0.875rem",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = colors.bgTertiary;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <span style={{ marginRight: "0.5rem" }}>{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Laws Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {activeCategory === "store" ? (
            // Store Laws Subcategories
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1rem",
                }}
              >
                {storeSubcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    style={{
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      border: `1px solid ${colors.border}`,
                      backgroundColor: colors.bgSecondary,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      <span style={{ fontSize: "1.5rem" }}>{subcategory.emoji}</span>
                      <h3 style={{ fontWeight: "bold", color: colors.text, margin: 0 }}>
                        {subcategory.name}
                      </h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {subcategory.laws.map((law) => (
                        <div
                          key={law.id}
                          style={{
                            display: "flex",
                            gap: "0.75rem",
                            padding: "0.5rem",
                            borderRadius: "0.375rem",
                            backgroundColor: colors.bgTertiary,
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.accent;
                            e.currentTarget.style.opacity = "0.8";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = colors.bgTertiary;
                            e.currentTarget.style.opacity = "1";
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              color: colors.accent,
                              minWidth: "fit-content",
                            }}
                          >
                            {law.id}.
                          </span>
                          <p
                            style={{
                              fontSize: "0.875rem",
                              color: colors.textSecondary,
                              margin: 0,
                            }}
                          >
                            {law.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Filtered Store Laws Display */}
              {searchQuery && filteredStoreLaws.length > 0 && (
                <div
                  style={{
                    marginTop: "2rem",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.bgSecondary,
                  }}
                >
                  <h3 style={{ fontWeight: "bold", color: colors.text, marginBottom: "1rem" }}>
                    نتائج البحث
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {filteredStoreLaws.map((law) => (
                      <div
                        key={`${law.subcategory}-${law.id}`}
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          padding: "0.75rem",
                          borderRadius: "0.375rem",
                          backgroundColor: colors.bgTertiary,
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.accent;
                          e.currentTarget.style.opacity = "0.8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = colors.bgTertiary;
                          e.currentTarget.style.opacity = "1";
                        }}
                      >
                        <span style={{ fontSize: "1rem" }}>{law.emoji}</span>
                        <div>
                          <p
                            style={{
                              fontSize: "0.75rem",
                              color: colors.textMuted,
                              margin: "0 0 0.25rem 0",
                            }}
                          >
                            {law.subcategory}
                          </p>
                          <p style={{ color: colors.textSecondary, margin: 0 }}>
                            {law.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Regular Categories Laws List
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {filteredLaws.length > 0 ? (
                filteredLaws.map((law) => (
                  <div
                    key={law.id}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      border: `1px solid ${colors.border}`,
                      backgroundColor: colors.bgSecondary,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.bgTertiary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.bgSecondary;
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        color: colors.accent,
                        fontSize: "1.125rem",
                        minWidth: "fit-content",
                      }}
                    >
                      {law.id}.
                    </span>
                    <p style={{ color: colors.textSecondary, margin: 0 }}>
                      {law.text}
                    </p>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p style={{ color: colors.textMuted }}>لم يتم العثور على قوانين</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 20,
          borderTop: `1px solid ${colors.border}`,
          backgroundColor: isDarkMode ? `${colors.bg}cc` : `${colors.bg}cc`,
        padding: "1.5rem 1rem",
        marginTop: "3rem",
        textAlign: "center",
        fontSize: "0.875rem",
        color: colors.textMuted,
      }}
      >
        <p style={{ margin: 0 }}>© 2024 VibesRP - جميع الحقوق محفوظة</p>
        <p style={{ margin: "0.25rem 0 0 0" }}>آخر تحديث: ١٤‏/٥‏/٢٠٢٦</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
