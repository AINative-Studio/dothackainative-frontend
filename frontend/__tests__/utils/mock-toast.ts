export const mockToast = jest.fn()

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
    dismiss: jest.fn(),
    toasts: [],
  }),
  toast: mockToast,
}))

export function resetToastMock() {
  mockToast.mockClear()
}
