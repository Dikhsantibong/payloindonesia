<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Invoice {{ $invoice->invoice_number }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #333333;
            font-size: 13px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 0px;
        }
        table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            border-collapse: collapse;
        }
        table td {
            padding: 6px;
            vertical-align: top;
        }
        .header-table td {
            padding: 0;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #1e40af; /* primary blue color */
            letter-spacing: -1px;
        }
        .logo-sub {
            font-size: 12px;
            color: #64748b;
            font-weight: normal;
            margin-top: 4px;
        }
        .invoice-title {
            text-align: right;
            font-size: 24px;
            font-weight: bold;
            color: #0f172a;
            text-transform: uppercase;
            margin: 0;
        }
        .invoice-meta {
            text-align: right;
            margin-top: 8px;
            font-size: 12px;
            color: #475569;
        }
        .divider {
            border-bottom: 2px solid #e2e8f0;
            margin: 20px 0;
        }
        .details-table {
            margin-bottom: 30px;
        }
        .details-table td {
            width: 50%;
            padding: 0 10px 0 0;
        }
        .section-title {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            color: #64748b;
            margin-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
        }
        .party-info {
            font-size: 13px;
            color: #1e293b;
        }
        .party-name {
            font-size: 15px;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 4px;
        }
        .items-table {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .items-table th {
            background-color: #1e40af;
            color: #ffffff;
            font-weight: bold;
            text-align: left;
            padding: 10px;
            font-size: 12px;
            text-transform: uppercase;
        }
        .items-table td {
            padding: 12px 10px;
            border-bottom: 1px solid #f1f5f9;
        }
        .items-table tr:nth-child(even) td {
            background-color: #f8fafc;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .summary-table {
            width: 320px;
            float: right;
            margin-top: 10px;
        }
        .summary-table td {
            padding: 6px 10px;
        }
        .summary-table tr.total-row td {
            font-weight: bold;
            font-size: 16px;
            color: #1e40af;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
        }
        .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            line-height: 1.2;
        }
        .badge-draft { background-color: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }
        .badge-sent { background-color: #dbeafe; color: #1d4ed8; border: 1px solid #93c5fd; }
        .badge-paid { background-color: #d1fae5; color: #065f46; border: 1px solid #6ee7b7; }
        .badge-overdue { background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
        .badge-cancelled { background-color: #f3f4f6; color: #374151; border: 1px solid #d1d5db; }
        .notes-box {
            clear: both;
            margin-top: 50px;
            padding: 15px;
            background-color: #f8fafc;
            border-left: 4px solid #cbd5e1;
            font-size: 12px;
            color: #475569;
            border-radius: 0 4px 4px 0;
        }
        .footer {
            margin-top: 60px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="invoice-box">
        <!-- Top Kop Surat -->
        <table class="header-table">
            <tr>
                <td>
                    <div class="logo">{{ $settings['app_name'] ?? 'Paylo' }}</div>
                    <div class="logo-sub">Sistem Manajemen Aplikasi Kasir</div>
                </td>
                <td>
                    <h1 class="invoice-title">Invoice</h1>
                    <div class="invoice-meta" style="margin-top: 10px;">
                        <table style="width: auto; margin-left: auto; border-collapse: collapse;">
                            <tr>
                                <td style="text-align: right; padding: 2px 4px; font-weight: bold; font-size: 12px; color: #475569;">Nomor:</td>
                                <td style="text-align: left; padding: 2px 4px; font-family: monospace; font-size: 13px; font-weight: bold; color: #0f172a;">{{ $invoice->invoice_number }}</td>
                            </tr>
                            <tr>
                                <td style="text-align: right; padding: 2px 4px; font-weight: bold; font-size: 12px; color: #475569; vertical-align: middle;">Status:</td>
                                <td style="text-align: left; padding: 2px 4px; vertical-align: middle;">
                                    <span class="badge badge-{{ $invoice->status }}">
                                        @if($invoice->status === 'draft') Draft
                                        @elseif($invoice->status === 'sent') Terkirim
                                        @elseif($invoice->status === 'paid') Lunas
                                        @elseif($invoice->status === 'overdue') Jatuh Tempo
                                        @elseif($invoice->status === 'cancelled') Dibatalkan
                                        @else {{ $invoice->status }}
                                        @endif
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>

        <div class="divider"></div>

        <!-- Details Grid -->
        <table class="details-table">
            <tr>
                <td>
                    <div class="section-title">Penerbit (Bill From)</div>
                    <div class="party-info">
                        <div class="party-name">{{ $settings['app_name'] ?? 'Paylo Indonesia' }}</div>
                        <div>Email: {{ $settings['support_email'] ?? 'support@paylo.id' }}</div>
                        <div>Telp: {{ $settings['support_phone'] ?? '+62 800 1234 5678' }}</div>
                    </div>
                </td>
                <td>
                    <div class="section-title">Penerima (Bill To)</div>
                    <div class="party-info">
                        <div class="party-name">{{ $invoice->tenant->business_name }}</div>
                        <div>Email: {{ $invoice->tenant->email ?? '-' }}</div>
                        <div>Telp: {{ $invoice->tenant->phone ?? '-' }}</div>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Dates Table -->
        <table style="width: 100%; margin-bottom: 30px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px; font-size: 12px;">
            <tr>
                <td style="width: 25%;"><strong>Tanggal Invoice:</strong><br>{{ $invoice->issue_date->format('d M Y') }}</td>
                <td style="width: 25%;"><strong>Tanggal Jatuh Tempo:</strong><br>{{ $invoice->due_date->format('d M Y') }}</td>
                <td style="width: 50%;">
                    @if($invoice->billing_period_start && $invoice->billing_period_end)
                        <strong>Periode Layanan:</strong><br>
                        {{ $invoice->billing_period_start->format('d M Y') }} - {{ $invoice->billing_period_end->format('d M Y') }}
                    @endif
                </td>
            </tr>
        </table>

        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 45%;">Deskripsi Layanan</th>
                    <th style="width: 15%; text-align: center;">Durasi (Bulan)</th>
                    <th style="width: 20%; text-align: right;">Harga per Bulan</th>
                    <th style="width: 20%; text-align: right;">Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($invoice->items as $item)
                    <tr>
                        <td><strong>{{ $item->description }}</strong></td>
                        <td class="text-center">{{ $item->quantity }}</td>
                        <td class="text-right">Rp {{ number_format($item->unit_price, 0, ',', '.') }}</td>
                        <td class="text-right" style="font-weight: bold;">Rp {{ number_format($item->amount, 0, ',', '.') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Summary -->
        <table class="summary-table">
            <tr>
                <td class="text-right" style="color: #64748b; font-size: 12px;">Subtotal</td>
                <td class="text-right" style="font-weight: bold; width: 140px;">Rp {{ number_format($invoice->subtotal, 0, ',', '.') }}</td>
            </tr>
            @if($invoice->tax_rate > 0)
                <tr>
                    <td class="text-right" style="color: #64748b; font-size: 12px;">Pajak ({{ floatval($invoice->tax_rate) }}%)</td>
                    <td class="text-right" style="font-weight: bold;">Rp {{ number_format($invoice->tax_amount, 0, ',', '.') }}</td>
                </tr>
            @endif
            <tr class="total-row">
                <td class="text-right">Total Tagihan</td>
                <td class="text-right">Rp {{ number_format($invoice->total, 0, ',', '.') }}</td>
            </tr>
        </table>

        <!-- Payment Info & Notes -->
        <table style="width: 100%; margin-top: 40px; clear: both; border-collapse: collapse; border: none;">
            <tr>
                <td style="width: 55%; padding: 0 15px 0 0; border: none; vertical-align: top;">
                    <div style="background-color: #f8fafc; border-left: 4px solid #1e40af; padding: 15px; border-radius: 0 4px 4px 0;">
                        <strong style="color: #0f172a; font-size: 13px; display: block; margin-bottom: 8px;">Informasi Pembayaran:</strong>
                        <table style="width: 100%; font-size: 12px; border-collapse: collapse; border: none;">
                            <tr>
                                <td style="width: 90px; padding: 3px 0; font-weight: bold; color: #475569; border: none;">Bank:</td>
                                <td style="padding: 3px 0; color: #0f172a; font-weight: bold; border: none;">{{ $settings['bank_name'] ?? 'BANK SULTRA' }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 3px 0; font-weight: bold; color: #475569; border: none;">No. Rekening:</td>
                                <td style="padding: 3px 0; color: #0f172a; font-family: monospace; font-size: 13px; font-weight: bold; border: none;">{{ $settings['bank_account_number'] ?? '205.01.04.000531' }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 3px 0; font-weight: bold; color: #475569; border: none;">Atas Nama:</td>
                                <td style="padding: 3px 0; color: #0f172a; border: none;">{{ $settings['bank_account_name'] ?? 'PT KREATIF TEKNOLOGI MAJU BERSAMA' }}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 10px; color: #64748b; font-size: 11px; line-height: 1.4;">
                            * Harap lakukan konfirmasi pembayaran setelah transfer berhasil dilakukan demi kelancaran proses aktivasi layanan Anda.
                        </div>
                    </div>
                </td>
                <td style="width: 45%; padding: 0; border: none; vertical-align: top;">
                    @if($invoice->notes)
                        <div style="background-color: #f8fafc; border-left: 4px solid #cbd5e1; padding: 15px; border-radius: 0 4px 4px 0; height: 100%;">
                            <strong style="color: #0f172a; font-size: 13px; display: block; margin-bottom: 8px;">Catatan Tambahan:</strong>
                            <div style="color: #334155; line-height: 1.4; font-size: 12px;">
                                {!! nl2br(e($invoice->notes)) !!}
                            </div>
                        </div>
                    @endif
                </td>
            </tr>
        </table>

        <!-- Signature -->
        <div style="margin-top: 50px; text-align: right; padding-right: 50px;">
            <p style="margin-bottom: 60px; font-size: 13px; color: #0f172a;">Hormat Kami,</p>
            <p style="font-weight: bold; font-size: 13px; color: #0f172a; text-decoration: underline;">{{ $settings['signature_name'] ?? 'Administrator' }}</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Invoice ini dibuat secara otomatis oleh sistem dan sah tanpa tanda tangan basah.</p>
            <p>&copy; {{ date('Y') }} {{ $settings['app_name'] ?? 'Paylo Indonesia' }}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
