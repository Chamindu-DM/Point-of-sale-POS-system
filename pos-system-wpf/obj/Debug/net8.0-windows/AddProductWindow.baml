   M S B A M L   `   `   `  ����I  ECheeseBakesPOS, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:CheeseBakesPOSCheeseBakesPOS  5   	   %    CheeseBakesPOS.AddProductWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   .localclr-namespace:CheeseBakesPOS     5   	     � Title$  Add Product��5   	   $	��500��6   $	��500��6*    � WindowStartupLocation$ CenterOwner=�66   .��5	      � $��20q�6    � RowDefinitions 5
   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   �� $��Add New Product��6   $��24(�6+   $
��Bold"�69   $��0,0,0,20q�6K   $��0��6]   � 5   
   $��1��6    � ColumnDefinitions 5      �� 5      $��* �6#   �� 5      $��* �6#   .+�5      �� $��0��6   $��0,0,10,0q�6)   .+�5      �� $��Product Name:��6   $��0,0,0,5q�61   �� 5      -   5         ��Name$ ProductNameTextBox��5      $��0,0,0,15q�66   �� 5      $��	Category:��6   $��0,0,0,5q�6-   �� 5      -   5         ��Name$ CategoryComboBox��5       �� 
IsEditable$
 True��65   $��0,0,0,15q�6G   .@�5      �� .��6#   Buns6)   �� 5      .��6#   
Pastries6-   �� 5       .��6#   
Desserts6-   �� 5!      .��6#   	Beverages6.   �� 5"      .��6#   Other6*   5#      �� 5%      $��Price:��6   $��0,0,0,5q�6*   �� 5&      -   5        $ PriceTextBox��5&      $��0,0,0,15q�60   �� 5(      $��Stock Quantity:��6   $��0,0,0,5q�63   �� 5)      -   5        $ StockTextBox��5)      $��0,0,0,15q�60   �� 5+      $��Image Path:��6   $��0,0,0,5q�6/   � 5,       5-      �� 5.      $��* �6+   �� 5/      $
��Auto �6+   .+�51      �� -   5        $ ImagePathTextBox��51      $��0��68   �� 52      -   5        $��Browse��52      $��1��6.   $��5,0,0,0q�6>   $	��5,0q�6O   6]   53      54      �� 56      $��1��6   ���#CCCCCC$��1q�6;   $��10,0,0,0q�6O   ._�57      �� -   5         ��Name$ ProductImage��57      $��Uniform=�6.   58      59      �� 5;   
   $��2��6    �� Orientation$ 
Horizontal=�6"   $��Right=�6;   $��0,20,0,0q�6W   .+�5<      �� -   5        	 ��Name$	 CancelButton��5<      $��Cancel��6+   $	��100��6<   $��0,0,10,0q�6H   6Z   �� 5=      -	   5        $	 
SaveButton��5=      $
��Save��6)   $	��100��68   ���#3E91FF
�������6l   5>      5?      5@      