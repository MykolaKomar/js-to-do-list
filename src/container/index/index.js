// створюємо клас Todo так експортуємо його на випадок
// якщо його потрібно буде використати ще десь
export class Todo {
  // статичне поле NAME з локальним ключем сховища todo
  static #NAME = 'todo'

  // статичний метод saveData
  static #saveData = () => {
    // localStorage -- Це вбудований об'єкт браузера, який надає доступ до
    // локального сховища браузера, в яке можна записувати дані
    // setItem-- зберігає значення. При повторному виклику з тим жк
    // ключем перезапише попереднє значення
    // setItem(key, value) -- key - це ідентифікатор, під яким зберігається значення
    // value - значення яку ви хочете зберігти
    localStorage.setItem(
      this.#NAME,
      // JSON.stringify(value, replacer, space)--
      // це вбудована функуція, яка перетворює значення JavaScript
      // на рядок у форматі JSON
      //  ** value -- Об'єкт або значення JavaScript, яке буде перетворено на
      //     JSON рядок.
      //  ** replacer -- Функція або масив, які використовуються для контролю над
      //     тим, які значення будуть включені у JSON рядок або як вони
      //     будуть змінені.
      //  ** space -- Форматування рядка JSON з перенесенням рядків і відступами
      //     для кращої зрозумілості. Може бути числом або рядком.
      JSON.stringify({
        list: this.#list,
        count: this.#count,
      }),
    )
  }

  static #loadData = () => {
    // отримуєм в дата з значенням з localStorage
    const data = localStorage.getItem(this.#NAME)
    // Якщо я отримує да
    if (data) {
      // повертаю значення з JSONа в JS через parse()
      // Це вбудована функція, яка перетворює рядок у форматі
      // JSON в об'єтк або значення в форматі JavaScript
      // JSON.parse(text, reviver)

      // ** text -- Рядок у форматі JSON який має бути розпарсений
      // ** reviver(необов'язковий) -- Функція, яка виконує перетворення
      //    з такими аргументами:
      //    ** key -- ключ, пов'язаний зі значенням
      //    ** velue -- Значення, створене синтаксичним аналізом

      // через диструктуризацію витягуємо потрібні значення
      const { list, count } = JSON.parse(data)
      // потрібні значення записуємо в потрібні місця
      this.#list = list
      this.#count = count
    }
  }
  // створимо статичне приватне поле list
  // де триматимемо об'єкти наших задач
  static #list = []
  // створимо статичне приватне поле count
  // для зберігання історії номерів завдань
  static #count = 0

  // створимо статичний приватний метод createTaskData()
  // він додаватиме нову задачу в середину list
  static #createTaskData = (text) => {
    // через push додаємо до list новий об'єкт
    this.#list.push({
      // порядковий номер завдання
      // перед записом збільшується на 1
      id: ++this.#count,
      // вміст завдання
      text,
      // статус завдання (виконане/невиконане)
      done: false,
    })
  }
  // створимо статичні приватні поля
  // #block -- поле в якому ми триматимемо посилання на елемент з main
  static #block = null
  // #template -- поле для посилання на template що звертатись до шбланної верстки
  static #template = null
  // #input -- поле для посилання на input
  static #input = null
  // #button -- поле для посилання на button
  static #button = null

  // статичний метод який буде ініціалізувати наш TodoList
  static init = () => {
    //
    this.#template =
      // document.getElementById(id) -- Це вбудована функція документа,
      // яка дозволяє отримати посилання на елемент HTML-документа за атрибутом id
      document.getElementById(
        'task',
      ).content.firstElementChild

    // підключає селектор task__list через querySelector() до поля block
    // querySelector() -- Це вбудована функція, яка шукає елементи в документі,
    // що відповідають певному CSS-селектору.
    this.#block = document.querySelector('.task__list')

    // підключає селектор form__input через querySelector() до поля input
    // querySelector() -- Це вбудована функція, яка шукає елементи в документі,
    // що відповідають певному CSS-селектору.
    this.#input = document.querySelector('.form__input')

    // підключає селектор form__button через querySelector() до поля button
    // querySelector() -- Це вбудована функція, яка шукає елементи в документі,
    // що відповідають певному CSS-селектору.
    this.#button = document.querySelector('.form__button')

    // Привязання методу handleAdd до кнопки через onclick
    // яке додаватиме нове завдання в список #list
    // onclick - подія яка виникає коли відбувається один клік.
    this.#button.onclick = this.#handleAdd

    // визов функції
    this.#loadData()
    // визов функції
    this.#render()
  }

  // створимо статичний приватний метод handleAdd()
  // він створюватиме нове завдання
  static #handleAdd = () => {
    // створюємо константу з значення вмісту інпуту
    const value = this.#input.value
    // перевіряємо чи є хоч один символ в значенні інпуту щоб не
    // створити пусте завдання
    if (value.length > 1) {
      // в метод createTaskData передаємо значення з input через
      // value
      this.#createTaskData(value)
      // робимо інпут пустим після введення якогось значення
      this.#input.value = ''
      this.#render()
      this.#saveData()
    }
  }

  // створюємо статичний приватний метод render який буде відповідати
  // за те щоб, відобразити наш список завдань
  static #render = () => {
    // Звертаємось до block  та через innerHTML робимо пустий вміст
    // innerHTML -- Це вбудована властивість, яка дозволяє отримувати або
    // змінювати HTML-код елемента або його контенту
    this.#block.innerHTML = ''
    // перевіряємо чи список пустий, якщо так пишемо що він пустий через innerText
    // innerText -- Це вбудована властивість,
    // яка містить текстовий вміст елемента.
    if (this.#list.length === 0) {
      this.#block.innerText = `Список задач пустий `
    }
    // якщо список не пустий через forEach() проходжусть по листу
    else {
      this.#list.forEach((taskData) => {
        const el = this.#createTaskElem(taskData)
        // додаємо елемент через append до блоку
        // append() --Це вбудована функція, яка додає дочірній елемент до
        // батьківського елемента в кінець
        this.#block.append(el)
      })
    }
  }

  static #createTaskElem = (data) => {
    // клонуємо елемент через сloneNode
    // сloneNode -- Це вбудована функція, яка використовується
    // для створення поверхневої або глибокої копії елемента
    const el = this.#template.cloneNode(true)

    // Витягуємо через деструкторизацію потрібні елементи
    const [id, text, btnDo, btnCancel] = el.children

    // Виводимо індекс(порядковий номер) задачі
    // innerText -- Це вбудована властивість,
    // яка містить текстовий вміст елемента.
    id.innerText = `${data.id}.`

    // Виводимо індекс(порядковий номер) задачі
    // innerText -- Це вбудована властивість,
    // яка містить текстовий вміст елемента.
    text.innerText = data.text

    btnCancel.onclick = this.#handleCancel(data)

    // Зв'язуєм btnDo з #handleDo через onclick та передаємо
    // значення data, btnDo, el
    btnDo.onclick = this.#handleDo(data, btnDo, el)

    if (data.done) {
      el.classList.add('task-done')
      btnDo.classList.remove('task__button--do')
      btnDo.classList.add('task__button--done')
    }

    return el
  }

  static #handleDo = (data, btn, el) => () => {
    // записуємо в константу toggleDone з data.id
    const result = this.#toggleDone(data.id)

    // classList -- Це вбудована властивість, яка дозволяє додавати,
    // видаляти та перевіряти наявність класів у елементі
    // toggle(class, force) -- class — рядок, який представляє клас, який потрібно
    // додати або видалити зі списку класів.
    // force (необов’язковий) — вказує, чи потрібно явно додати
    // (true) або видалити (false) клас.
    if (result === true || result === false) {
      el.classList.toggle('task--done')
      btn.classList.toggle('task__button--do')
      btn.classList.toggle('task__button--done')

      this.#saveData()
    }
  }

  // знаходить по ідентифікатору елемент
  static #toggleDone = (id) => {
    const task = this.#list.find((item) => item.id === id)
    // якщо елемент є змінюємо значення
    if (task) {
      task.done = !task.done
      return task.done
    } else {
      return null
    }
  }

  static #handleCancel = (data) => () => {
    // визиваємо модульне вікно через confirm з запитанням про видалення
    if (confirm('Видалити задачу?')) {
      // робимо змінну з видаленням об'єкта по ід
      const result = this.#deleteById(data.id)
      // якщо видалення відбувається тоді ми оновлюємо наш список
      if (result) {
        this.#render()
        this.#saveData()
      }
    }
  }

  // статчний метод який приймає елемент по ід та повертає тру
  static #deleteById = (id) => {
    this.#list = this.#list.filter((item) => item.id !== id)
    return true
  }
}

// визиваємо статичний метод init()
Todo.init()
// записуємо в window для взаємодії з ними за потреби
window.todo = Todo
