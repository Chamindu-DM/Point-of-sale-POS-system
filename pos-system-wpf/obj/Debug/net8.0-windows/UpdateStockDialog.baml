   M S B A M L   `   `   `  ����I  ECheeseBakesPOS, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:CheeseBakesPOSCheeseBakesPOS  5   	   &     CheeseBakesPOS.UpdateStockDialog   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   .localclr-namespace:CheeseBakesPOS     5   	     � Title$  Update Stock��5   	   $	��200��6   $	��350��6+    � WindowStartupLocation$ CenterOwner=�67    � 
ResizeMode$ NoResize=�6[   .��5	      � $��20q�6    � RowDefinitions 5
   
   �� 5      $
��Auto �6   �� 5      $
��Auto �6   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   �� -   5         ��Name$ ProductNameTextBlock��5   !   $��0��6   $
��Bold"�6?   $��16(�6Q   $��0,0,0,10q�6_   �� 5   
   $��1��6    �� Orientation$ 
Horizontal=�6"   $��0,0,0,10q�6;   .+�5      �� $��Current Stock:��6   $	��120��6.   �� 5      -   5        $ CurrentStockTextBlock��5      $��0��67   5      �� 5   
   $��2��6   $ 
Horizontal=�6"   $��0,0,0,10q�6;   .+�5      �� $��New Stock Level:��6   $	��120��60   $��Center=�6<   �� 5      -   5         ��Name$ NewStockTextBox��5      $	��100��6/   6;   5      �� 5   
   $��4��6   $ 
Horizontal=�6"   $��Right=�6;   .+�5      �� -   5        $��Cancel��5      $��80��6&   $��0,0,10,0q�61   6C   �� 5       -   5        $��Update��5       $��80��6&   ���#4CAF50
�������6Y   5!      5"      5#      