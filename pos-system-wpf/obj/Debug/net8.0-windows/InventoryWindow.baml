   M S B A M L   `   `   `  ����I  ECheeseBakesPOS, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:CheeseBakesPOSCheeseBakesPOS  5   	   $    CheeseBakesPOS.InventoryWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   .localclr-namespace:CheeseBakesPOS     5   	     � Title$  	Inventory��5   	   $	��600��6   $	��900��6(   .��5	      �  � RowDefinitions 5
   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   �� $��0��6   $��20,20,20,10q�6"   .+�5      �� $��	Inventory��6   $��24(�6)   $
��Bold"�67   � 5      $��	0,20,0,10q�6    � ColumnDefinitions 5      �� 5      $��* �6'   �� 5      $
��Auto �6'   .+�5      ��  �� Orientation$ 
Horizontal=�6   .+�5      �� $��Filter by Category:��6    $��Center=�6;   $��0,0,10,0q�6V   �� 5      -   5         ��Name$ CategoryComboBox��5      $	��150��69    �� SelectedIndex$ 0��6E   6W   5      �� 5      -   5        $��1��5      $��Refresh��6)   $
��15,5q�6;   ���#3E91FF
�������$��0q�6r   6�   5      5      &   System.Windows.Controls.DataGrid  5!   
   -   5          Name$ InventoryDataGrid��5!      $��1��6.   $��20q�6;      AutoGenerateColumns$ False��5"         
IsReadOnly$ False��6/   	   AlternatingRowBackground	 �#F5F5F5
   Columns
 5#      0  *System.Windows.Controls.DataGridTextColumn  5$      ,  &System.Windows.Controls.DataGridColumn   Header$ ID��6%      Width5  /System.Windows.Controls.DataGridLengthConverter$ 60 61      
IsReadOnly$
 True��6S   1  +System.Windows.Controls.DataGridBoundColumn   Binding 6<   �� *Id+6S     5%      $
 Name��6%   $	 150 63   $
 True��6X    6?   �� *Name+6X     5&      $ Category��6%   $	 120 67   $
 True��6`    6C   �� *
Category+6`     5'      $ Current Stock��6%   $	 100 6<    6H   �� *	InStock+  5(      $ Price��6%   $	 100 64   $
 True��6q    6@   �� *Price+ �� StringFormat$ {0:C2}��6q   4  .System.Windows.Controls.DataGridTemplateColumn  5)      $ Status��6)   $	 120 69      CellTemplate 5*      �� 5+      .R�5,      �� ��6(   �� *Status+��6@   �� *StatusColor+5-      5/        50      $ Actions��6)   $ * 6:    51      �� 52      .R�53      �� $ 
Horizontal=�6)   .+�54   "   �� -   5        $��Update Stock��54   )   ���#4CAF50
�������$��0q�55   )   $
��10,2q�6=   $��0,0,5,0q�6L   6]   56      57      59      5;      �� 5>   
   $��2��6   .@�5?      �� -   5         ��Name$ StatusTextBlock��5?      $��Ready��61   5@      5A      5B      