---
# title为文章的标题
title: Java8 方法引用
# cover为文章的首图和缩略图
cover: https://hanggle-blog.oss-cn-hangzhou.aliyuncs.com/article/java.jpg
# 作者信息，多作者则设置为数组
author: 
  nick: hanggle
  link: https://www.github.com/hanggle
# 如果文章为转载文章，需要多加文章出处项
#editor:
#  name: Minfive
#  link: https://www.github.com/Mrminfive
# 首页每篇文章的子标题
subtitle: 对象引用：不同对象可以操作同一块内容。方法引用：指为一个方法设置一个别名。
tags: 
    - 基础
    - java8
categories: java
date: 2017-03-05 22:14:31
---

# Java1.8 方法引用

####  方法引用基础

对象引用：不同对象可以操作同一块内容。

方法引用：指为一个方法设置一个别名

方法引用的四种形式:

1. 引用静态方法： **类名称：：static 方法名称**
2. 引用某个对象的方法： **实例化对象：：普通方法**
3. 引用特定类型的方法： **特定类：：普通方法**
4. 引用构造方法： **类名称：：new**



**@FunctionalInterface表示这是一个函数式的接口，这个声明的接口中只能有一个方法。实现方法的引用都要加上这个注解**

1. 引用静态方法

   ```java
   /**
    * 实现方法的引用接口
    * 静态方法别名
    * @param <P> 参数
    * @param <R> 返回值
    */
   @FunctionalInterface
   interface IMessage<P, R>{
       public R change(P p);
   }
   
   public class StaticMethod {
       public static void main(String[] args){
           // 重命名String的静态valueOf()方法
           IMessage<Integer, String> msg = String::valueOf;
           String zhuanhuan = msg.change(1000);
           System.out.println(zhuanhuan.replace("0", "zzzz"));
       }
   }
   ```
2. 引用某个对象的方法

   ```java
   /**
    * 实现方法的引用(普通方法别名)
    * @param <R> 返回值
    */
   @FunctionalInterface
   interface CommonMethodImpl<R>{
       R upper();
   }
   
   public class CommonMethod {
       public static void main(String[] args){
           // 重命名String的普通的toUpperCase()方法
           CommonMethodImpl<String> commonMethod = "aaaaa"::toUpperCase;
           System.out.println(commonMethod.upper());
       }
   
   }
   ```

3. 引用特定类型的方法

   ```java
   /**
    * 引用特定类型的方法
    * @param <P> 参数
    */
   @FunctionalInterface
   interface SpecialMethodImpl<P>{
       int compare(P p1, P p2);
   }
   public class Specialmethod {
       public static void main(String[] args){
           SpecialMethodImpl<String> specialMethod = String::compareTo;
           System.out.println(specialMethod.compare("a", "b"));
       }
   
   }
   ```
   ​     

4. 引用构造方法

   ```java
   /**
    * 调用构造方法
    * @param <C> 构造的类
    */
   interface ConsuMethodImpl<C> {
       C create(String t, Integer p);
   
   }
   public class ConsuMethod {
       public static void main(String[] args){
           ConsuMethodImpl<Book> consuMethod = Book::new;
           Book book = consuMethod.create("围城", 300);
           System.out.println(book);
       }
   }
   class Book{
       private String title;
       private Integer pages;
   
       public Book(String title, Integer pages) {
           this.title = title;
           this.pages = pages;
       }
   
       @Override
       public String toString() {
           return "Book{" +
                   "title='" + title + '\'' +
                   ", pages=" + pages +
                   '}';
       }
   }
   ```


   对象的引用是使用不同的名字；而方法的引用是需要有一个函数式的接口，并且设置好参数。

#### java提供的四个核心接口

1. 功能型接口（Function）：

   此接口需要接收一个参数，并返回一个处理结果

   ```java
   public Interface Function<T,R>{
       R apply(T t);
   }
   ```
   demo:
   ```java
   Function<String, String> function = String::toUpperCase;
   System.out.println(function.apply("hello"));
   ```

2. 消费型接口（Function）：

   此接口只负责接收数据（引用数据是不需要返回），并且不返回处理结果

   ```java
   public Interface Consumer<T>{
       void accept(T t);
   }
   ```
   demo:
   ```java
   Consumer<String> consumer = System.out::println;
   consumer.accept("hello consumer");
   ```

3. 供给型接口（Supplier）：

   此接口不接受参数，但是可以返回结果。

   ```java
   public Interface Supplier<T>{
       T get();
   }
   ```
   demo:
   ```java
   Supplier<String> supplier = "hello"::toUpperCase;
   System.out.println(supplier.get());
   ```

4. 断言型接口（Predicate）：

   * 进行判断操作使用

   ```java
   public Interface Predicate<T>{
       boolean test(T t)；
   }
   ```
   * demo:
   ```java
   Predicate<String> predicate = "test"::equals;
   System.out.println(predicate.test("test2"));
   ```









