   M S B A M L   `   `   `  ����I  ECheeseBakesPOS, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:CheeseBakesPOSCheeseBakesPOS  5   	   #    CheeseBakesPOS.ProductsWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   .localclr-namespace:CheeseBakesPOS     5   	     � Title$  Product Management��5   	   $	��600��6$   $	��900��61    � WindowStartupLocation$ CenterScreen=�6=   .��5	      �  � RowDefinitions 5
   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   �� $��0��6   $��20,20,20,10q�6"   .+�5      �� $��Product Management��6   $��24(�62   $
��Bold"�6@   $��0,0,0,10q�6R   c� 5      .@�5      �� -   5        $��Add New Product��5      $
��10,5q�6K   �� 5      -   5        $��Edit Product��5      $
��10,5q�6I   $��10,0,0,0q�6X   �� 5      -   5        $��Delete Product��5      $
��10,5q�6M   $��10,0,0,0q�6\   �� 5      -   5        $��Refresh��5      $
��10,5q�6G   $��10,0,0,0q�6V   5      5      &   System.Windows.Controls.DataGrid  5   
   -   5          Name$ ProductsDataGrid��5      $��1��6-   $��20q�6:      AutoGenerateColumns$ False��5         
IsReadOnly$
 True��6/      SelectionMode$ Single=�5          SelectionUnit$ FullRow=�6*      Columns 5!      0  *System.Windows.Controls.DataGridTextColumn  5"      ,  &System.Windows.Controls.DataGridColumn	   Header$	 ID��6%   
   Width5  /System.Windows.Controls.DataGridLengthConverter$
 50 6H   1  +System.Windows.Controls.DataGridBoundColumn   Binding 61   �� *Id+6H     5#      $
	 Name��6%   $	
 200 6L    63   �� *Name+6L     5$      $	 Category��6%   $	
 150 6T    67   �� *
Category+6T     5%      $	 Price��6%   $	
 100 6e    64   �� *Price+ �� StringFormat$ {0:C2}��6e     5&      $	 In Stock��6%   $	
 100 6S    67   �� *	InStock+6S     5'      $	 
Image Path��6%   $
 * 6Y    69   �� *ImageSource+6Y   5)      �� 5,   
   $��2��6   .@�5-      �� -   5         ��Name$ 
StatusText��5-      $��Ready��6,   5.      5/      50      