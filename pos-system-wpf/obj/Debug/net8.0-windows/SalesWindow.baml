   M S B A M L   `   `   `  ����I  ECheeseBakesPOS, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:CheeseBakesPOSCheeseBakesPOS  5   	        CheeseBakesPOS.SalesWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   .localclr-namespace:CheeseBakesPOS     5   	     � Title$  Sales History��5   	   $	��600��6   $	��900��6,   .��5	      �  � RowDefinitions 5
   
   �� 5      $
��Auto �6   �� 5      $��* �6   �� 5      $
��Auto �6   .+�5   
   �� $��0��6   $��20,20,20,10q�6"   .+�5      �� $��Sales History��6   $��24(�6-   $
��Bold"�6;   $��0,0,0,10q�6M   c� 5      .@�5      �� -   5        $��Refresh��5      $
��10,5q�6G   5      5      &   System.Windows.Controls.DataGrid  5   
   $��1��6      AutoGenerateColumns$ False��6>      
IsReadOnly$
 True��6Z   $��20q�6l      AlternatingRowBackground �#F5F5F5��6    �� *Sales+   Columns 5      0  *System.Windows.Controls.DataGridTextColumn  5      ,  &System.Windows.Controls.DataGridColumn   Header$ Order ID��6%      Width5  /System.Windows.Controls.DataGridLengthConverter$ 80 67   1  +System.Windows.Controls.DataGridBoundColumn   Binding 6B   �� *Id+  5      $
 Date��6%   $	 180 63    6?   �� *
SaleDate+	 �� StringFormat$	 {0:dd/MM/yyyy hh:mm tt}��  5      $ Total Amount��6%   $	 120 6;    6G   �� *TotalAmount+$	 {0:C2}��  5      $ Payment��6%   $	 120 66    6B   �� *PaymentAmount+$	 {0:C2}��  5       $ Change��6%   $	 120 65    6A   �� *ChangeAmount+$	 {0:C2}��4  .System.Windows.Controls.DataGridTemplateColumn  5!      $ Actions��6)   $ * 6:   
   CellTemplate
 5"      �� 5#      .R�5$      �� -   5        $��View Details��5$   %   ���#4CAF50
�������$��0q�6d   $
��10,3q�6x   6�   5%      5'      5)      �� 5,   
   $��2��6   .@�5-      �� -   5         ��Name$ StatusTextBlock��5-      $��Ready��61   5.      5/      50      