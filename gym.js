// مدیریت تغییر حالت تاریک/روشن
class SimpleThemeManager {
    constructor() {
        this.theme = localStorage.getItem('simple-theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupEventListeners();
        this.updateThemeButton();
    }

    applyTheme() {
        document.body.setAttribute('data-theme', this.theme);
        localStorage.setItem('simple-theme', this.theme);
        this.updateThemeButton();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        
        // انیمیشن تغییر آیکون
        this.animateThemeIcon();
    }

    setupEventListeners() {
        // دکمه تغییر حالت
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // دکمه CTA
        const ctaButton = document.getElementById('startWorkoutBtn');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => this.handleCTAClick());
        }

        // تشخیص حالت پیش‌فرض سیستم
        this.detectSystemTheme();
    }

    detectSystemTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // اگر کاربر theme را دستی انتخاب نکرده باشد، از تنظیمات سیستم استفاده کن
        if (!localStorage.getItem('simple-theme')) {
            this.theme = prefersDark.matches ? 'dark' : 'light';
            this.applyTheme();
        }

        // گوش دادن به تغییرات سیستم
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('simple-theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }

    updateThemeButton() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('.theme-icon i');
        const text = themeToggle.querySelector('.theme-text');

        if (this.theme === 'dark') {
            // حالت تاریک فعال است
            if (icon) {
                icon.className = 'fas fa-sun';
                icon.style.color = '#FFD166'; // رنگ زرد برای خورشید
            }
            if (text) {
                text.textContent = 'حالت روز';
            }
        } else {
            // حالت روشن فعال است
            if (icon) {
                icon.className = 'fas fa-moon';
                icon.style.color = '#3A86FF'; // رنگ آبی برای ماه
            }
            if (text) {
                text.textContent = 'حالت شب';
            }
        }
    }

    animateThemeIcon() {
        const icon = document.querySelector('.theme-icon i');
        if (!icon) return;

        // انیمیشن چرخش
        icon.style.transition = 'transform 0.5s ease, color 0.3s ease';
        icon.style.transform = 'rotate(360deg)';
        
        // ریست انیمیشن
        setTimeout(() => {
            icon.style.transform = 'rotate(0deg)';
        }, 500);
    }

    handleCTAClick() {
        const ctaButton = document.getElementById('startWorkoutBtn');
        if (!ctaButton) return;

        // انیمیشن کلیک
        ctaButton.style.transform = 'scale(0.95)';
        
        // ریست انیمیشن
        setTimeout(() => {
            ctaButton.style.transform = '';
        }, 150);

        // شبیه‌سازی رفتن به صفحه تمرین
        console.log('رفتن به صفحه تمرین...');
        
        // در حالت واقعی، اینجا کاربر را به صفحه تمرین هدایت می‌کنیم
        // window.location.href = '/workout';
        
        // نمایش پیام موقت
        this.showToastMessage('در حال انتقال به صفحه تمرین...');
    }

    showToastMessage(message) {
        // ایجاد عنصر toast
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 50%;
            transform: translateX(50%);
            background: var(--color-primary);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: var(--shadow-lg);
            animation: toastSlideIn 0.3s ease;
        `;

        document.body.appendChild(toast);

        // حذف خودکار بعد از 3 ثانیه
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// استایل‌های انیمیشن toast
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes toastSlideIn {
        from {
            opacity: 0;
            transform: translateX(50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(50%) translateY(0);
        }
    }
    
    @keyframes toastSlideOut {
        from {
            opacity: 1;
            transform: translateX(50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(toastStyles);

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new SimpleThemeManager();
    
    // اضافه کردن انیمیشن‌های اضافی
    addHeaderEffects();
});

// اضافه کردن افکت‌های زیبایی به هدر
function addHeaderEffects() {
    const header = document.querySelector('.simple-header');
    
    // افکت اسکرول
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
}


















// برنامه گرم کردن - JavaScript ساده‌شده

class WarmupProgram {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // باز و بسته کردن بخش‌ها
        document.querySelectorAll('.section-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                const sectionId = e.currentTarget.dataset.section;
                this.toggleSection(sectionId);
            });
        });
        
    }
    
    toggleSection(sectionId) {
        const sectionContent = document.getElementById(`section-${sectionId}`);
        const toggleBtn = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (sectionContent && toggleBtn) {
            sectionContent.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        }
    }
    
    showToast(message) {
        // ایجاد عنصر toast
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        
        // استایل‌های toast
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 50%;
            transform: translateX(50%);
            background: var(--color-primary);
            color: var(--color-text-inverse);
            padding: 12px 24px;
            border-radius: var(--radius-md);
            font-weight: 600;
            z-index: 10000;
            box-shadow: var(--shadow-lg);
            animation: toastSlideIn 0.3s ease;
        `;
        
        // اضافه کردن استایل‌های انیمیشن
        const style = document.createElement('style');
        style.textContent = `
            @keyframes toastSlideIn {
                from {
                    opacity: 0;
                    transform: translateX(50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(50%) translateY(0);
                }
            }
            
            @keyframes toastSlideOut {
                from {
                    opacity: 1;
                    transform: translateX(50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(50%) translateY(-20px);
                }
            }
            
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(58, 134, 255, 0.4);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(58, 134, 255, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(58, 134, 255, 0);
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(toast);
        
        // حذف خودکار پس از 3 ثانیه
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// مقداردهی اولیه برنامه
document.addEventListener('DOMContentLoaded', () => {
    const warmupProgram = new WarmupProgram();
    
    // باز کردن اولین بخش به صورت پیش‌فرض
    warmupProgram.toggleSection('1');
});

// مدیریت حالت تاریک/روشن
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('workout-theme', newTheme);
    });
}

// تنظیم حالت اولیه از localStorage
const savedTheme = localStorage.getItem('workout-theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);


















// برنامه هفتگی - با نمایش محتوای انتخابی
document.addEventListener('DOMContentLoaded', function() {
    // تمام روزها را انتخاب کن
    const dayItems = document.querySelectorAll('.day-item');
    const dayContents = document.querySelectorAll('.day-content');
    
    // تابع برای تغییر روز فعال
    function activateDay(dayId) {
        // غیرفعال کردن تمام روزها
        dayItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // پنهان کردن تمام محتواها
        dayContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // فعال کردن روز انتخاب شده
        const activeDay = document.querySelector(`.day-item[data-day="${dayId}"]`);
        const activeContent = document.getElementById(`content-${dayId}`);
        
        if (activeDay && activeContent) {
            activeDay.classList.add('active');
            activeContent.classList.add('active');
            
            // اسکرول به محتوا - حذف شده
            // setTimeout(() => {
            //     const contentArea = document.querySelector('.content-area');
            //     const offset = 100;
            //     window.scrollTo({
            //         top: contentArea.offsetTop - offset,
            //         behavior: 'smooth'
            //     });
            // }, 100);
        }
    }
    
    // اضافه کردن event listener به هر روز
    dayItems.forEach(item => {
        item.addEventListener('click', function() {
            const dayId = this.dataset.day;
            activateDay(dayId);
        });
    });
    
    // فعال کردن روز اول (شنبه) به صورت پیش‌فرض
    const firstDay = dayItems[0];
    if (firstDay) {
        const firstDayId = firstDay.dataset.day;
        activateDay(firstDayId);
    }
    
    // تابع برای پر کردن محتوای روزها (برای استفاده در آینده)
    window.updateDayContent = function(dayId, exercises) {
        const contentElement = document.getElementById(`content-${dayId}`);
        if (!contentElement) return;
        
        const exerciseList = contentElement.querySelector('.exercise-list');
        if (!exerciseList) return;
        
        // پاک کردن لیست فعلی
        exerciseList.innerHTML = '';
        
        // اضافه کردن تمرین‌های جدید
        exercises.forEach((exercise, index) => {
            const exerciseItem = document.createElement('div');
            exerciseItem.className = 'exercise-item';
            exerciseItem.innerHTML = `
                <div class="exercise-number">${index + 1}</div>
                <div class="exercise-info">
                    <h4 class="exercise-name">${exercise.name}</h4>
                    <div class="exercise-details">
                        <span class="sets">${exercise.sets}</span>
                        <span class="rest">${exercise.rest}</span>
                    </div>
                </div>
            `;
            exerciseList.appendChild(exerciseItem);
        });
    };
    
    // تابع برای آپدیت تاریخ روزها
    window.updateDayDate = function(dayId, dateText) {
        const dayItem = document.querySelector(`.day-item[data-day="${dayId}"]`);
        if (!dayItem) return;
        
        const dateElement = dayItem.querySelector('.day-date');
        if (dateElement) {
            dateElement.textContent = dateText;
        }
        
        // آپدیت تاریخ در محتوا
        const contentElement = document.getElementById(`content-${dayId}`);
        if (contentElement) {
            const contentDate = contentElement.querySelector('.content-date span');
            if (contentDate) {
                contentDate.textContent = dateText;
            }
        }
    };
    
    // تابع برای آپدیت عنوان روز
    window.updateDayTitle = function(dayId, titleText) {
        const contentElement = document.getElementById(`content-${dayId}`);
        if (!contentElement) return;
        
        const titleElement = contentElement.querySelector('.content-title');
        if (titleElement) {
            titleElement.textContent = titleText;
        }
    };
    
    // مثال استفاده از توابع در آینده:
    /*
    // آپدیت محتوای روز دوشنبه
    const mondayExercises = [
        { name: 'اسکوات جدید', sets: '۴ ست ۸ تایی', rest: 'استراحت: ۱۲۰ ثانیه' },
        { name: 'لانج جدید', sets: '۳ ست ۱۲ تایی', rest: 'استراحت: ۹۰ ثانیه' }
    ];
    window.updateDayContent('monday', mondayExercises);
    
    // آپدیت تاریخ روز
    window.updateDayDate('saturday', '۲۹ فروردین');
    
    // آپدیت عنوان روز
    window.updateDayTitle('saturday', 'برنامه جدید شنبه');
    */
});




























// برنامه هفتگی - سیستم مدیریت محتوا (بدون اسکرول)
class WeeklyPlanManager {
    constructor() {
        this.init();
        this.loadInitialData(); // داده‌های اولیه برای نمایش
    }
    
    init() {
        this.setupEventListeners();
        this.activateFirstDay();
        this.setupEmptyStates();
    }
    
    setupEventListeners() {
        // کلیک روی روزها
        document.querySelectorAll('.day-item').forEach(item => {
            item.addEventListener('click', () => {
                const dayId = item.dataset.day;
                this.activateDay(dayId);
            });
        });
    }
    
    activateDay(dayId) {
        // غیرفعال کردن تمام روزها
        document.querySelectorAll('.day-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // پنهان کردن تمام محتواها
        document.querySelectorAll('.day-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // فعال کردن روز انتخاب شده
        const activeDay = document.querySelector(`.day-item[data-day="${dayId}"]`);
        const activeContent = document.getElementById(`content-${dayId}`);
        
        if (activeDay && activeContent) {
            activeDay.classList.add('active');
            activeContent.classList.add('active');
            
            // اسکرول حذف شده - کامنت اصلی حفظ شده
            // this.scrollToContent();
        }
    }
    
    activateFirstDay() {
        const firstDay = document.querySelector('.day-item');
        if (firstDay) {
            const dayId = firstDay.dataset.day;
            this.activateDay(dayId);
        }
    }
    
    setupEmptyStates() {
        // تنظیم وضعیت خالی برای لیست‌های تمرین
        const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
        
        days.forEach(day => {
            const exerciseList = document.getElementById(`exercise-list-${day}`);
            if (exerciseList && exerciseList.children.length === 0) {
                this.showEmptyState(exerciseList, 'هنوز تمرینی اضافه نشده');
            }
        });
        
        // وضعیت خالی برای روز استراحت
        const restDay = document.getElementById('rest-day-content');
        if (restDay && restDay.children.length === 0) {
            this.showRestDayEmptyState(restDay);
        }
    }
    
    showEmptyState(container, message) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-dumbbell"></i>
                <p>${message}</p>
                <small>از پنل ادمین تمرین‌ها را اضافه کنید</small>
            </div>
        `;
    }
    
    showRestDayEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bed"></i>
                <p>اطلاعات روز استراحت</p>
                <small>از پنل ادمین محتوای روز استراحت را تنظیم کنید</small>
            </div>
        `;
    }
    
    // ===== API برای پنل ادمین =====
    
    // افزودن تمرین به یک روز
    addExercise(dayId, exerciseData) {
        const exerciseList = document.getElementById(`exercise-list-${dayId}`);
        if (!exerciseList) return false;
        
        // حذف حالت خالی اگر وجود دارد
        if (exerciseList.querySelector('.empty-state')) {
            exerciseList.innerHTML = '';
        }
        
        // ایجاد آیتم تمرین جدید
        const exerciseItem = this.createExerciseItem(exerciseData, exerciseList.children.length + 1);
        exerciseList.appendChild(exerciseItem);
        
        return true;
    }
    
    // حذف تمام تمرین‌های یک روز
    clearExercises(dayId) {
        const exerciseList = document.getElementById(`exercise-list-${dayId}`);
        if (!exerciseList) return false;
        
        exerciseList.innerHTML = '';
        this.showEmptyState(exerciseList, 'تمرین‌ها حذف شدند');
        
        return true;
    }
    
    // آپدیت عنوان روز
    updateDayTitle(dayId, newTitle) {
        const contentElement = document.getElementById(`content-${dayId}`);
        if (!contentElement) return false;
        
        const titleElement = contentElement.querySelector('.content-title');
        if (titleElement) {
            titleElement.textContent = newTitle;
        }
        
        return true;
    }
    
    // تنظیم محتوای روز استراحت
    setRestDayContent(contentData) {
        const restDay = document.getElementById('rest-day-content');
        if (!restDay) return false;
        
        restDay.innerHTML = `
            <div class="rest-icon">
                <i class="${contentData.icon || 'fas fa-bed'}"></i>
            </div>
            <h3 class="rest-title">${contentData.title || 'روز استراحت'}</h3>
            <p class="rest-description">${contentData.description || ''}</p>
            ${contentData.activities ? this.createRestActivities(contentData.activities) : ''}
        `;
        
        return true;
    }
    
    // ===== توابع کمکی =====
    
    createExerciseItem(exerciseData, number) {
        const template = document.getElementById('exercise-template');
        const clone = template.content.cloneNode(true);
        
        const exerciseItem = clone.querySelector('.exercise-item');
        exerciseItem.querySelector('.exercise-number').textContent = number;
        exerciseItem.querySelector('.exercise-name').textContent = exerciseData.name;
        exerciseItem.querySelector('.sets').textContent = exerciseData.sets || 'بدون ست';
        exerciseItem.querySelector('.rest').textContent = exerciseData.rest || 'بدون استراحت';
        
        return exerciseItem;
    }
    
    createRestActivities(activities) {
        if (!Array.isArray(activities)) return '';
        
        const activitiesHtml = activities.map(activity => `
            <li>
                <i class="${activity.icon || 'fas fa-check'}"></i>
                ${activity.text}
            </li>
        `).join('');
        
        return `
            <ul class="rest-activities">
                ${activitiesHtml}
            </ul>
        `;
    }
    
    loadInitialData() {
        // این تابع می‌تواند از localStorage یا API داده بارگذاری کند
        // برای نمونه، داده‌های اولیه را تنظیم می‌کنیم
        
        // نمونه داده برای روز شنبه
        const saturdayExercises = [
            { name: 'اسکوات با هالتر', sets: '۳ ست ۱۰ تایی', rest: 'استراحت: ۹۰ ثانیه' },
            { name: 'پرس پا', sets: '۴ ست ۱۲ تایی', rest: 'استراحت: ۶۰ ثانیه' }
        ];
        
        saturdayExercises.forEach(exercise => {
            this.addExercise('saturday', exercise);
        });
        
        // نمونه برای روز استراحت
        this.setRestDayContent({
            icon: 'fas fa-bed',
            title: 'روز استراحت فعال',
            description: 'امروز روز استراحت شماست. فعالیت‌های سبک انجام دهید.',
            activities: [
                { icon: 'fas fa-walking', text: 'پیاده‌روی آرام' },
                { icon: 'fas fa-swimming-pool', text: 'حرکات کششی' },
                { icon: 'fas fa-heart', text: 'مدیتیشن و ریلکسیشن' }
            ]
        });
    }
    
    // ===== ذخیره و بازیابی داده‌ها =====
    
    // ذخیره تمام داده‌ها در localStorage
    saveToLocalStorage() {
        const data = {
            exercises: {},
            restDay: {}
        };
        
        // ذخیره تمرین‌ها
        const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
        days.forEach(day => {
            const exerciseList = document.getElementById(`exercise-list-${day}`);
            if (exerciseList) {
                const exercises = this.extractExercisesFromList(exerciseList);
                data.exercises[day] = exercises;
            }
        });
        
        // ذخیره روز استراحت
        const restDay = document.getElementById('rest-day-content');
        if (restDay) {
            data.restDay = this.extractRestDayData(restDay);
        }
        
        localStorage.setItem('weeklyPlanData', JSON.stringify(data));
        return true;
    }
    
    // بارگذاری از localStorage
    loadFromLocalStorage() {
        const savedData = localStorage.getItem('weeklyPlanData');
        if (!savedData) return false;
        
        try {
            const data = JSON.parse(savedData);
            
            // بارگذاری تمرین‌ها
            Object.keys(data.exercises || {}).forEach(day => {
                data.exercises[day].forEach(exercise => {
                    this.addExercise(day, exercise);
                });
            });
            
            // بارگذاری روز استراحت
            if (data.restDay) {
                this.setRestDayContent(data.restDay);
            }
            
            return true;
        } catch (error) {
            console.error('خطا در بارگذاری داده‌ها:', error);
            return false;
        }
    }
    
    // استخراج تمرین‌ها از لیست
    extractExercisesFromList(exerciseList) {
        const exercises = [];
        const items = exerciseList.querySelectorAll('.exercise-item:not(.empty-state)');
        
        items.forEach(item => {
            const name = item.querySelector('.exercise-name')?.textContent;
            const sets = item.querySelector('.sets')?.textContent;
            const rest = item.querySelector('.rest')?.textContent;
            
            if (name) {
                exercises.push({ name, sets, rest });
            }
        });
        
        return exercises;
    }
    
    // استخراج داده‌های روز استراحت
    extractRestDayData(restDay) {
        const icon = restDay.querySelector('.rest-icon i')?.className;
        const title = restDay.querySelector('.rest-title')?.textContent;
        const description = restDay.querySelector('.rest-description')?.textContent;
        
        const activities = [];
        const activityItems = restDay.querySelectorAll('.rest-activities li');
        activityItems.forEach(item => {
            const icon = item.querySelector('i')?.className;
            const text = item.textContent.trim();
            activities.push({ icon, text });
        });
        
        return { icon, title, description, activities };
    }
}

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', () => {
    window.weeklyPlan = new WeeklyPlanManager();
    
    // API عمومی برای استفاده در پنل ادمین
    window.weeklyPlanAPI = {
        // افزودن تمرین
        addExercise: (dayId, exerciseData) => {
            return window.weeklyPlan.addExercise(dayId, exerciseData);
        },
        
        // حذف تمام تمرین‌های یک روز
        clearExercises: (dayId) => {
            return window.weeklyPlan.clearExercises(dayId);
        },
        
        // آپدیت عنوان روز
        updateDayTitle: (dayId, newTitle) => {
            return window.weeklyPlan.updateDayTitle(dayId, newTitle);
        },
        
        // تنظیم محتوای روز استراحت
        setRestDayContent: (contentData) => {
            return window.weeklyPlan.setRestDayContent(contentData);
        },
        
        // ذخیره در localStorage
        saveData: () => {
            return window.weeklyPlan.saveToLocalStorage();
        },
        
        // بارگذاری از localStorage
        loadData: () => {
            return window.weeklyPlan.loadFromLocalStorage();
        },
        
        // فعال کردن یک روز خاص
        activateDay: (dayId) => {
            window.weeklyPlan.activateDay(dayId);
        }
    };
    
    // بارگذاری خودکار از localStorage
    setTimeout(() => {
        window.weeklyPlan.loadFromLocalStorage();
    }, 500);
});









































// ==================== مدیر برنامه تمرینی - نسخه نهایی ====================
class WorkoutManagerPerfect {
    constructor() {
        this.storageKey = 'workout-plans-perfect';
        this.currentPlanId = null;
        this.isEditing = false;
        this.init();
    }

    init() {
        this.ensurePlansExist();
        this.createUI();
        this.bindEvents();
        this.loadPlans();
    }

    ensurePlansExist() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultPlan = {
                id: 'default',
                name: 'برنامه پیش‌فرض',
                description: 'برنامه تمرینی پایه برای شروع کار',
                category: 'عمومی',
                level: 'مبتدی',
                duration: '4 هفته',
                favorite: false,
                days: {
                    saturday: [
                        { name: 'اسکوات با هالتر', sets: '3 ست 10 تایی', rest: '60 ثانیه' }
                    ],
                    monday: [
                        { name: 'پرس سینه', sets: '3 ست 10 تایی', rest: '60 ثانیه' }
                    ],
                    wednesday: [
                        { name: 'ددلیفت', sets: '3 ست 8 تایی', rest: '90 ثانیه' }
                    ]
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify([defaultPlan]));
        }
    }

    getPlans() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('خطا در بارگذاری برنامه‌ها:', error);
            return [];
        }
    }

    savePlans(plans) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(plans));
            return true;
        } catch (error) {
            console.error('خطا در ذخیره برنامه‌ها:', error);
            return false;
        }
    }

    createUI() {
        // دکمه اصلی در صفحه
        const mainButton = document.createElement('button');
        mainButton.id = 'workoutManagerBtn';
        mainButton.innerHTML = `
            <i class="fas fa-dumbbell"></i>
            <span>برنامه‌ها</span>
        `;
        mainButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #3A86FF, #6A5AF9);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 20px rgba(58, 134, 255, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(mainButton);

        // پنل مدیریت
        const panel = document.createElement('div');
        panel.id = 'workoutManagerPanel';
        panel.innerHTML = `
            <div class="panel-header">
                <h3><i class="fas fa-dumbbell"></i> مدیریت برنامه تمرینی</h3>
                <button class="close-panel"><i class="fas fa-times"></i></button>
            </div>
            
            <div class="panel-tabs">
                <button class="tab-btn active" data-tab="plans">
                    <i class="fas fa-list"></i> برنامه‌ها
                </button>
                <button class="tab-btn" data-tab="create">
                    <i class="fas fa-plus"></i> جدید
                </button>
            </div>

            <div class="tab-content active" id="plans-tab">
                <div class="plans-list" id="plansList"></div>
            </div>

            <div class="tab-content" id="create-tab">
                <form id="createPlanForm">
                    <div class="form-group">
                        <label>نام برنامه *</label>
                        <input type="text" id="planName" placeholder="مثلاً: برنامه حجم‌گیری" required>
                    </div>
                    
                    <div class="form-group">
                        <label>توضیحات</label>
                        <textarea id="planDescription" placeholder="توضیح مختصر..." rows="2"></textarea>
                    </div>

                    <div class="days-section">
                        <h4>روزهای تمرین</h4>
                        <div class="days-selector">
                            ${this.createDaysSelector()}
                        </div>
                    </div>

                    <div id="exercisesContainer"></div>

                    <div class="form-actions">
                        <button type="submit" class="submit-btn">
                            <i class="fas fa-save"></i> ذخیره برنامه
                        </button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(panel);

        // تمرین‌های پیش‌فرض برای روزهای انتخاب شده
        this.generateExerciseInputs(['saturday', 'monday', 'wednesday']);
        
        this.injectStyles();
    }

    createDaysSelector() {
        // ترتیب صحیح روزهای هفته
        const days = [
            { id: 'saturday', label: 'شنبه' },
            { id: 'sunday', label: 'یکشنبه' },
            { id: 'monday', label: 'دوشنبه' },
            { id: 'tuesday', label: 'سه‌شنبه' },
            { id: 'wednesday', label: 'چهارشنبه' },
            { id: 'thursday', label: 'پنجشنبه' }
        ];

        return days.map(day => `
            <label class="day-option">
                <input type="checkbox" value="${day.id}" ${['saturday', 'monday', 'wednesday'].includes(day.id) ? 'checked' : ''}>
                <span class="checkmark"></span>
                <span class="day-label">${day.label}</span>
            </label>
        `).join('');
    }

    injectStyles() {
        const styles = `
            <style>
                /* Reset */
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                /* پنل مدیریت */
                #workoutManagerPanel {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 100%;
                    height: 100vh;
                    background: var(--color-bg-primary);
                    z-index: 1001;
                    transition: right 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                @media (min-width: 768px) {
                    #workoutManagerPanel {
                        width: 400px;
                        right: -400px;
                    }
                }

                #workoutManagerPanel.active {
                    right: 0;
                }

                /* جلوگیری از اسکرول افقی */
                body.workout-panel-open {
                    overflow: hidden;
                }

                .panel-header {
                    padding: 20px;
                    background: linear-gradient(135deg, #3A86FF, #6A5AF9);
                    color: white;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-shrink: 0;
                    position: relative;
                    z-index: 1;
                }

                .panel-header h3 {
                    margin: 0;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .close-panel {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .panel-tabs {
                    display: flex;
                    background: var(--color-bg-secondary);
                    border-bottom: 1px solid var(--color-border);
                    flex-shrink: 0;
                }

                .tab-btn {
                    flex: 1;
                    padding: 16px;
                    background: none;
                    border: none;
                    border-bottom: 3px solid transparent;
                    color: var(--color-text-secondary);
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .tab-btn.active {
                    color: #3A86FF;
                    border-bottom-color: #3A86FF;
                    background: var(--color-bg-primary);
                }

                .tab-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    display: none;
                    -webkit-overflow-scrolling: touch;
                }

                .tab-content.active {
                    display: block;
                }

                /* لیست برنامه‌ها */
                .plans-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .plan-item {
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    padding: 20px;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .plan-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 12px;
                    gap: 12px;
                }

                .plan-name {
                    font-weight: 600;
                    color: var(--color-text-primary);
                    margin: 0;
                    font-size: 16px;
                    line-height: 1.4;
                    flex: 1;
                }

                .plan-actions {
                    display: flex;
                    gap: 8px;
                    flex-shrink: 0;
                }

                .plan-btn {
                    background: var(--color-bg-primary);
                    border: 1px solid var(--color-border);
                    color: var(--color-text-secondary);
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .plan-btn:hover {
                    background: var(--color-bg-tertiary);
                }

                .plan-btn.use:hover {
                    background: #3A86FF;
                    color: white;
                    border-color: #3A86FF;
                }

                .plan-btn.favorite.active {
                    background: #FFD166;
                    color: white;
                    border-color: #FFD166;
                }

                .plan-details {
                    font-size: 14px;
                    color: var(--color-text-secondary);
                    margin-bottom: 8px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    align-items: center;
                }

                .plan-desc {
                    color: var(--color-text-secondary);
                    font-size: 14px;
                    line-height: 1.5;
                    margin-top: 8px;
                }

                .plan-days {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-top: 8px;
                }

                .plan-day-tag {
                    background: rgba(58, 134, 255, 0.1);
                    color: #3A86FF;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                }

                /* فرم ایجاد برنامه */
                #createPlanForm {
                    width: 100%;
                    max-width: 100%;
                }

                .form-group {
                    margin-bottom: 20px;
                    width: 100%;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    color: var(--color-text-primary);
                    font-weight: 500;
                    font-size: 14px;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 14px;
                    border: 1px solid var(--color-border);
                    border-radius: 10px;
                    background: var(--color-bg-secondary);
                    color: var(--color-text-primary);
                    font-size: 15px;
                    transition: border-color 0.2s ease;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #3A86FF;
                }

                .form-group textarea {
                    resize: vertical;
                    min-height: 80px;
                }

                .days-section {
                    margin: 24px 0;
                    width: 100%;
                }

                .days-section h4 {
                    margin-bottom: 16px;
                    color: var(--color-text-primary);
                    font-size: 16px;
                    font-weight: 600;
                }

                .days-selector {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    width: 100%;
                }

                @media (max-width: 480px) {
                    .days-selector {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 360px) {
                    .days-selector {
                        grid-template-columns: 1fr;
                    }
                }

                .day-option {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding: 12px;
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    transition: all 0.2s ease;
                    position: relative;
                }

                .day-option:hover {
                    border-color: #3A86FF;
                    transform: translateY(-1px);
                }

                .day-option input {
                    display: none;
                }

                .checkmark {
                    width: 20px;
                    height: 20px;
                    border: 2px solid var(--color-border);
                    border-radius: 4px;
                    margin-left: 12px;
                    position: relative;
                    flex-shrink: 0;
                    transition: all 0.2s ease;
                }

                .day-option input:checked + .checkmark {
                    background: #3A86FF;
                    border-color: #3A86FF;
                }

                .checkmark:after {
                    content: "✓";
                    position: absolute;
                    display: none;
                    color: white;
                    font-size: 12px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .day-option input:checked + .checkmark:after {
                    display: block;
                }

                .day-label {
                    font-size: 15px;
                    font-weight: 500;
                    color: var(--color-text-primary);
                }

                /* تمرین‌ها */
                #exercisesContainer {
                    margin: 24px 0;
                    width: 100%;
                }

                .day-exercises {
                    margin-bottom: 24px;
                    display: none;
                    width: 100%;
                    background: var(--color-bg-secondary);
                    border-radius: 12px;
                    padding: 16px;
                    border: 1px solid var(--color-border);
                }

                .day-exercises.active {
                    display: block;
                }

                .day-title {
                    color: var(--color-text-primary);
                    font-weight: 600;
                    margin-bottom: 16px;
                    padding-bottom: 12px;
                    border-bottom: 2px solid var(--color-border);
                    font-size: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .day-title span {
                    flex: 1;
                }

                .day-actions {
                    display: flex;
                    gap: 8px;
                }

                .day-add-exercise {
                    background: none;
                    border: 1px solid var(--color-border);
                    color: var(--color-text-secondary);
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }

                .day-add-exercise:hover {
                    background: #3A86FF;
                    color: white;
                    border-color: #3A86FF;
                }

                .exercises-list {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .exercise-item {
                    background: var(--color-bg-primary);
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    padding: 16px;
                    position: relative;
                    width: 100%;
                }

                .exercise-fields {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    width: 100%;
                }

                .exercise-fields input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    background: var(--color-bg-secondary);
                    color: var(--color-text-primary);
                    font-size: 14px;
                }

                .remove-exercise {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #FF4444;
                    color: white;
                    border: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }

                .form-actions {
                    margin-top: 24px;
                    width: 100%;
                }

                .submit-btn {
                    width: 100%;
                    background: linear-gradient(135deg, #3A86FF, #6A5AF9);
                    color: white;
                    border: none;
                    padding: 16px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(58, 134, 255, 0.3);
                }

                .submit-btn:active {
                    transform: translateY(0);
                }

                .empty-message {
                    text-align: center;
                    color: var(--color-text-secondary);
                    padding: 60px 20px;
                    font-size: 15px;
                }

                .empty-message i {
                    font-size: 40px;
                    margin-bottom: 16px;
                    color: var(--color-border);
                    display: block;
                }

                /* نوتیفیکیشن */
                .workout-notification {
                    position: fixed;
                    bottom: 100px;
                    left: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #3A86FF, #6A5AF9);
                    color: white;
                    padding: 16px 20px;
                    border-radius: 12px;
                    font-weight: 500;
                    z-index: 1002;
                    box-shadow: 0 8px 30px rgba(58, 134, 255, 0.3);
                    animation: slideUp 0.4s ease;
                    text-align: center;
                    font-size: 15px;
                    max-width: 500px;
                    margin: 0 auto;
                }

                @media (min-width: 768px) {
                    .workout-notification {
                        left: auto;
                        right: 30px;
                        bottom: 30px;
                        max-width: 350px;
                    }
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                }

                /* استایل‌های رسپانسیو */
                @media (max-width: 768px) {
                    #workoutManagerBtn {
                        bottom: 20px;
                        right: 20px;
                        padding: 14px 20px;
                        font-size: 15px;
                    }

                    .panel-header {
                        padding: 16px;
                    }

                    .panel-header h3 {
                        font-size: 17px;
                    }

                    .tab-btn {
                        padding: 14px 12px;
                        font-size: 14px;
                    }

                    .tab-content {
                        padding: 16px;
                    }

                    .plan-item {
                        padding: 16px;
                    }

                    .plan-header {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 12px;
                    }

                    .plan-actions {
                        justify-content: flex-start;
                    }

                    .plan-btn {
                        width: 44px;
                        height: 44px;
                    }

                    .form-group input,
                    .form-group textarea {
                        padding: 16px;
                        font-size: 16px;
                    }

                    .days-selector {
                        gap: 10px;
                    }

                    .day-option {
                        padding: 14px;
                    }

                    .exercise-item {
                        padding: 14px;
                    }

                    .exercise-fields input {
                        padding: 14px;
                    }
                }

                @media (max-width: 480px) {
                    #workoutManagerBtn span {
                        display: none;
                    }

                    #workoutManagerBtn {
                        width: 56px;
                        height: 56px;
                        border-radius: 50%;
                        padding: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    #workoutManagerBtn i {
                        font-size: 20px;
                        margin: 0;
                    }

                    .tab-btn span {
                        display: none;
                    }

                    .tab-btn i {
                        font-size: 18px;
                    }

                    .panel-header h3 span {
                        display: none;
                    }

                    .panel-header h3 i {
                        margin: 0;
                        font-size: 20px;
                    }
                }

                /* نمایش برنامه‌های فعال */
                .active-plans-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: var(--color-bg-primary);
                    border-bottom: 1px solid var(--color-border);
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    overflow-x: auto;
                    white-space: nowrap;
                    z-index: 999;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    -webkit-overflow-scrolling: touch;
                }

                .active-plans-bar::-webkit-scrollbar {
                    display: none;
                }

                .plan-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--color-bg-secondary);
                    border: 1px solid var(--color-border);
                    border-radius: 24px;
                    padding: 8px 16px;
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                    white-space: nowrap;
                    max-width: 200px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .plan-chip:hover {
                    border-color: #3A86FF;
                    background: rgba(58, 134, 255, 0.1);
                }

                .plan-chip.active {
                    background: #3A86FF;
                    color: white;
                    border-color: #3A86FF;
                }

                @media (max-width: 768px) {
                    .active-plans-bar {
                        padding: 10px 12px;
                    }
                    
                    .plan-chip {
                        padding: 6px 12px;
                        font-size: 12px;
                        max-width: 150px;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    bindEvents() {
        // دکمه اصلی
        document.getElementById('workoutManagerBtn').addEventListener('click', () => {
            this.togglePanel();
        });

        // بستن پنل
        document.querySelector('.close-panel').addEventListener('click', () => {
            this.closePanel();
        });

        // تغییر تب‌ها
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // انتخاب روزها - نمایش روزها به ترتیب صحیح
        document.addEventListener('change', (e) => {
            if (e.target.matches('.day-option input')) {
                const day = e.target.value;
                this.handleDaySelection(day, e.target.checked);
            }
        });

        // فرم ایجاد برنامه
        document.getElementById('createPlanForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePlan();
        });
    }

    togglePanel() {
        const panel = document.getElementById('workoutManagerPanel');
        panel.classList.toggle('active');
        document.body.classList.toggle('workout-panel-open');
        
        if (panel.classList.contains('active')) {
            this.loadPlans();
        }
    }

    closePanel() {
        document.getElementById('workoutManagerPanel').classList.remove('active');
        document.body.classList.remove('workout-panel-open');
    }

    switchTab(tabName) {
        // آپدیت دکمه‌های تب
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // آپدیت محتوای تب
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });

        if (tabName === 'plans') {
            this.loadPlans();
        } else {
            this.resetForm();
        }
    }

    handleDaySelection(day, isChecked) {
        const container = document.getElementById('exercisesContainer');
        
        if (isChecked) {
            // اگر بخش این روز وجود ندارد، ایجاد کن
            if (!document.getElementById(`exercises-${day}`)) {
                this.generateExerciseInputs([day]);
            }
            
            // نمایش بخش این روز
            const exercisesDiv = document.getElementById(`exercises-${day}`);
            if (exercisesDiv) {
                exercisesDiv.classList.add('active');
            }
        } else {
            // مخفی کردن بخش این روز
            const exercisesDiv = document.getElementById(`exercises-${day}`);
            if (exercisesDiv) {
                exercisesDiv.classList.remove('active');
            }
        }
        
        // مرتب‌سازی روزها به ترتیب صحیح
        this.sortDayExercises();
    }

    generateExerciseInputs(days) {
        const container = document.getElementById('exercisesContainer');
        
        days.forEach(day => {
            // اگر قبلاً ایجاد نشده باشد
            if (!document.getElementById(`exercises-${day}`)) {
                const dayNames = {
                    saturday: 'شنبه',
                    sunday: 'یکشنبه',
                    monday: 'دوشنبه',
                    tuesday: 'سه‌شنبه',
                    wednesday: 'چهارشنبه',
                    thursday: 'پنجشنبه'
                };

                const dayHTML = `
                    <div class="day-exercises" id="exercises-${day}">
                        <div class="day-title">
                            <span>${dayNames[day]}</span>
                            <div class="day-actions">
                                <button type="button" class="day-add-exercise" data-day="${day}">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="exercises-list" id="exercises-list-${day}">
                            <div class="exercise-item">
                                <div class="exercise-fields">
                                    <input type="text" placeholder="نام تمرین" class="exercise-name" required>
                                    <input type="text" placeholder="ست‌ها (مثلاً: ۳×۱۰)" class="exercise-sets" required>
                                    <input type="text" placeholder="استراحت (ثانیه)" class="exercise-rest">
                                </div>
                                <button type="button" class="remove-exercise">×</button>
                            </div>
                        </div>
                    </div>
                `;
                
                container.insertAdjacentHTML('beforeend', dayHTML);
                
                // اضافه کردن event listener برای دکمه‌ها
                const addBtn = container.querySelector(`.day-add-exercise[data-day="${day}"]`);
                if (addBtn) {
                    addBtn.addEventListener('click', () => this.addExerciseToDay(day));
                }
                
                const removeBtns = container.querySelectorAll(`#exercises-${day} .remove-exercise`);
                removeBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.target.closest('.exercise-item').remove();
                    });
                });
            }
        });
        
        // مرتب‌سازی روزها
        this.sortDayExercises();
    }

    sortDayExercises() {
        const container = document.getElementById('exercisesContainer');
        const dayOrder = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
        
        // جمع‌آوری همه بخش‌های روزها
        const daySections = Array.from(container.children);
        
        // مرتب‌سازی بر اساس ترتیب تعریف شده
        daySections.sort((a, b) => {
            const dayA = a.id.replace('exercises-', '');
            const dayB = b.id.replace('exercises-', '');
            return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
        });
        
        // حذف همه و اضافه کردن مجدد به ترتیب صحیح
        daySections.forEach(section => {
            container.appendChild(section);
        });
    }

    addExerciseToDay(day) {
        const exercisesList = document.getElementById(`exercises-list-${day}`);
        if (!exercisesList) return;

        const exerciseHTML = `
            <div class="exercise-item">
                <div class="exercise-fields">
                    <input type="text" placeholder="نام تمرین" class="exercise-name" required>
                    <input type="text" placeholder="ست‌ها (مثلاً: ۳×۱۰)" class="exercise-sets" required>
                    <input type="text" placeholder="استراحت (ثانیه)" class="exercise-rest">
                </div>
                <button type="button" class="remove-exercise">×</button>
            </div>
        `;
        
        exercisesList.insertAdjacentHTML('beforeend', exerciseHTML);
        
        // اضافه کردن event listener برای دکمه حذف
        const newExercise = exercisesList.lastElementChild;
        const removeBtn = newExercise.querySelector('.remove-exercise');
        removeBtn.addEventListener('click', (e) => {
            e.target.closest('.exercise-item').remove();
        });
    }

    savePlan() {
        const planName = document.getElementById('planName').value.trim();
        if (!planName) {
            this.showNotification('لطفاً نام برنامه را وارد کنید');
            return;
        }

        const selectedDays = Array.from(document.querySelectorAll('.day-option input:checked'))
            .map(cb => cb.value);

        if (selectedDays.length === 0) {
            this.showNotification('حداقل یک روز تمرین انتخاب کنید');
            return;
        }

        const daysData = {};
        let hasExercises = false;
        
        selectedDays.forEach(day => {
            const exercises = [];
            const exerciseItems = document.querySelectorAll(`#exercises-list-${day} .exercise-item`);
            
            exerciseItems.forEach(item => {
                const name = item.querySelector('.exercise-name').value.trim();
                const sets = item.querySelector('.exercise-sets').value.trim();
                const rest = item.querySelector('.exercise-rest').value.trim();
                
                if (name && sets) {
                    exercises.push({ 
                        name, 
                        sets, 
                        rest: rest || '60 ثانیه' 
                    });
                    hasExercises = true;
                }
            });
            
            if (exercises.length > 0) {
                daysData[day] = exercises;
            }
        });

        if (!hasExercises) {
            this.showNotification('حداقل یک تمرین برای یکی از روزها وارد کنید');
            return;
        }

        const planData = {
            id: this.currentPlanId || Date.now().toString(),
            name: planName,
            description: document.getElementById('planDescription').value.trim(),
            category: 'عمومی',
            level: 'متوسط',
            duration: '4 هفته',
            favorite: false,
            days: daysData,
            createdAt: this.currentPlanId ? new Date().toISOString() : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const plans = this.getPlans();
        
        if (this.currentPlanId && this.isEditing) {
            // ویرایش برنامه موجود
            const index = plans.findIndex(p => p.id === this.currentPlanId);
            if (index !== -1) {
                plans[index] = { ...plans[index], ...planData };
                this.showNotification('برنامه ویرایش شد');
            }
        } else {
            // ایجاد برنامه جدید
            plans.push(planData);
            this.showNotification('برنامه جدید ایجاد شد');
        }

        this.savePlans(plans);
        this.loadPlans();
        this.switchTab('plans');
        this.resetForm();
        this.updateActivePlansBar();
    }

    resetForm() {
        document.getElementById('planName').value = '';
        document.getElementById('planDescription').value = '';
        this.currentPlanId = null;
        this.isEditing = false;
        
        // ریست انتخاب روزها
        document.querySelectorAll('.day-option input').forEach(cb => {
            cb.checked = ['saturday', 'monday', 'wednesday'].includes(cb.value);
        });
        
        // ریست تمرین‌ها
        const container = document.getElementById('exercisesContainer');
        container.innerHTML = '';
        this.generateExerciseInputs(['saturday', 'monday', 'wednesday']);
        
        // نمایش روزهای انتخاب شده
        document.querySelectorAll('.day-option input:checked').forEach(cb => {
            const day = cb.value;
            const exercisesDiv = document.getElementById(`exercises-${day}`);
            if (exercisesDiv) {
                exercisesDiv.classList.add('active');
            }
        });
    }

    loadPlans() {
        const container = document.getElementById('plansList');
        const plans = this.getPlans();
        
        if (plans.length === 0) {
            container.innerHTML = `
                <div class="empty-message">
                    <i class="fas fa-dumbbell"></i>
                    <p>هنوز برنامه‌ای ایجاد نکرده‌اید</p>
                </div>
            `;
            return;
        }

        // ترتیب روزها برای نمایش
        const dayOrder = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
        const dayNames = {
            saturday: 'شنبه',
            sunday: 'یکشنبه',
            monday: 'دوشنبه',
            tuesday: 'سه‌شنبه',
            wednesday: 'چهارشنبه',
            thursday: 'پنجشنبه'
        };

        const plansHTML = plans.map(plan => {
            // روزهای برنامه را به ترتیب صحیح مرتب کن
            const sortedDays = Object.keys(plan.days || {})
                .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
                .map(day => dayNames[day]);
            
            return `
                <div class="plan-item" data-plan-id="${plan.id}">
                    <div class="plan-header">
                        <h4 class="plan-name">${plan.name}</h4>
                        <div class="plan-actions">
                            <button class="plan-btn use" title="استفاده" onclick="workoutManagerPerfect.usePlan('${plan.id}')">
                                <i class="fas fa-play"></i>
                            </button>
                            <button class="plan-btn favorite ${plan.favorite ? 'active' : ''}" 
                                    title="علاقه‌مندی" 
                                    onclick="workoutManagerPerfect.toggleFavorite('${plan.id}')">
                                <i class="${plan.favorite ? 'fas' : 'far'} fa-star"></i>
                            </button>
                            <button class="plan-btn edit" title="ویرایش" onclick="workoutManagerPerfect.editPlan('${plan.id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </div>
                    <div class="plan-details">
                        <span>${plan.duration}</span>
                        <span>•</span>
                        <span>${plan.level}</span>
                    </div>
                    ${sortedDays.length > 0 ? `
                        <div class="plan-days">
                            ${sortedDays.map(day => `<span class="plan-day-tag">${day}</span>`).join('')}
                        </div>
                    ` : ''}
                    ${plan.description ? `<p class="plan-desc">${plan.description}</p>` : ''}
                </div>
            `;
        }).join('');

        container.innerHTML = plansHTML;
        
        // به‌روزرسانی نوار برنامه‌های فعال
        this.updateActivePlansBar();
    }

    usePlan(planId) {
        const plans = this.getPlans();
        const plan = plans.find(p => p.id === planId);
        
        if (!plan) {
            this.showNotification('برنامه یافت نشد');
            return;
        }

        // ذخیره برنامه فعال
        localStorage.setItem('active-workout-plan', planId);

        // بارگذاری برنامه در صفحه اصلی
        if (typeof window.weeklyPlanAPI !== 'undefined') {
            // پاک کردن برنامه فعلی
            const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
            days.forEach(day => {
                if (window.weeklyPlanAPI.clearExercises) {
                    window.weeklyPlanAPI.clearExercises(day);
                }
            });

            // روزها را به ترتیب صحیح بارگذاری کن
            const dayOrder = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
            
            if (plan.days) {
                dayOrder.forEach(day => {
                    if (plan.days[day]) {
                        plan.days[day].forEach(exercise => {
                            if (window.weeklyPlanAPI.addExercise) {
                                window.weeklyPlanAPI.addExercise(day, {
                                    name: exercise.name,
                                    sets: exercise.sets,
                                    rest: exercise.rest
                                });
                            }
                        });
                    }
                });
            }

            // ذخیره تغییرات
            if (window.weeklyPlanAPI.saveData) {
                window.weeklyPlanAPI.saveData();
            }

            this.showNotification(`برنامه "${plan.name}" بارگذاری شد`);
            this.closePanel();
            this.updateActivePlansBar();
        } else {
            this.showNotification('برنامه در سایت بارگذاری شد');
            this.closePanel();
        }
    }

    toggleFavorite(planId) {
        const plans = this.getPlans();
        const planIndex = plans.findIndex(p => p.id === planId);
        
        if (planIndex !== -1) {
            plans[planIndex].favorite = !plans[planIndex].favorite;
            this.savePlans(plans);
            this.loadPlans();
            
            const action = plans[planIndex].favorite ? 'به علاقه‌مندی‌ها اضافه شد' : 'از علاقه‌مندی‌ها حذف شد';
            this.showNotification(action);
        }
    }

    editPlan(planId) {
        const plans = this.getPlans();
        const plan = plans.find(p => p.id === planId);
        
        if (!plan) return;

        this.currentPlanId = planId;
        this.isEditing = true;

        // پر کردن فرم
        document.getElementById('planName').value = plan.name;
        document.getElementById('planDescription').value = plan.description || '';

        // پاک کردن تمرین‌های قبلی
        const container = document.getElementById('exercisesContainer');
        container.innerHTML = '';

        // روزها را به ترتیب صحیح پردازش کن
        const dayOrder = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];
        
        dayOrder.forEach(day => {
            if (plan.days && plan.days[day]) {
                this.generateExerciseInputs([day]);
                
                // انتخاب چک‌باکس روز
                const checkbox = document.querySelector(`.day-option input[value="${day}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
                
                // پر کردن تمرین‌ها
                const exercisesList = document.getElementById(`exercises-list-${day}`);
                if (exercisesList) {
                    exercisesList.innerHTML = '';
                    
                    plan.days[day].forEach(exercise => {
                        const exerciseHTML = `
                            <div class="exercise-item">
                                <div class="exercise-fields">
                                    <input type="text" placeholder="نام تمرین" class="exercise-name" value="${exercise.name}">
                                    <input type="text" placeholder="ست‌ها" class="exercise-sets" value="${exercise.sets}">
                                    <input type="text" placeholder="استراحت" class="exercise-rest" value="${exercise.rest || '60 ثانیه'}">
                                </div>
                                <button type="button" class="remove-exercise">×</button>
                            </div>
                        `;
                        exercisesList.insertAdjacentHTML('beforeend', exerciseHTML);
                    });
                }
            }
        });

        // نمایش بخش روزهای انتخاب شده
        document.querySelectorAll('.day-option input:checked').forEach(cb => {
            const day = cb.value;
            const exercisesDiv = document.getElementById(`exercises-${day}`);
            if (exercisesDiv) {
                exercisesDiv.classList.add('active');
            }
        });

        // رفتن به تب ویرایش
        this.switchTab('create');
        
        // اسکرول به بالا
        document.getElementById('create-tab').scrollTop = 0;
    }

    updateActivePlansBar() {
        // حذف نوار قبلی اگر وجود دارد
        const existingBar = document.querySelector('.active-plans-bar');
        if (existingBar) {
            existingBar.remove();
        }

        const plans = this.getPlans();
        if (plans.length === 0) return;

        // ایجاد نوار جدید
        const bar = document.createElement('div');
        bar.className = 'active-plans-bar';
        bar.innerHTML = '<span style="color: var(--color-text-secondary); font-size: 13px; margin-left: 4px; white-space: nowrap;">برنامه‌ها:</span>';
        
        plans.forEach(plan => {
            const planChip = document.createElement('div');
            planChip.className = 'plan-chip';
            planChip.textContent = plan.name;
            planChip.title = `کلیک برای استفاده از ${plan.name}`;
            planChip.addEventListener('click', () => this.usePlan(plan.id));
            
            // علامت‌گذاری برنامه فعال
            const activePlanId = localStorage.getItem('active-workout-plan');
            if (plan.id === activePlanId) {
                planChip.classList.add('active');
            }
            
            bar.appendChild(planChip);
        });

        document.body.appendChild(bar);
        
        // تنظیم margin-top برای محتوای اصلی
        const mainContent = document.querySelector('.simple-header')?.nextElementSibling;
        if (mainContent) {
            mainContent.style.marginTop = '56px';
        }
    }

    showNotification(message) {
        // حذف نوتیفیکیشن قبلی
        const existing = document.querySelector('.workout-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'workout-notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ==================== مقداردهی اولیه ====================
let workoutManagerPerfect;

document.addEventListener('DOMContentLoaded', () => {
    workoutManagerPerfect = new WorkoutManagerPerfect();
    
    // اضافه کردن به window برای دسترسی از HTML
    window.workoutManagerPerfect = workoutManagerPerfect;
    
    console.log('✅ مدیر برنامه تمرینی (نسخه کامل) با موفقیت بارگذاری شد');
});










